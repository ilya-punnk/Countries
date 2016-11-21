<?php

//ini_set('display_errors',1);
//error_reporting(E_ALL);

file_put_contents('test', 'test');

include "db_login_data.php";

$proc = new ApiProcessor(
        $_SERVER['REQUEST_METHOD'],
        $_SERVER['PATH_INFO'],
        file_get_contents('php://input'),
        new db_login_data(
                $db_host,
                $db_user_name,
                $db_user_pass,
                $db_name));

$proc->get_respone();


class db_login_data{
    public $db_name;
    public $db_host;
    public $db_user_name;
    public $db_user_pass;
    public function __construct($db_host,$db_user_name,$db_user_pass,$db_name){
        $this->db_host=$db_host;
        $this->db_user_name=$db_user_name;
        $this->db_user_pass=$db_user_pass;
        $this->db_name=$db_name;
    }
}

class ApiProcessor{
    private $method;
    private $params;
    private $params_count;
    private $data;
    private $correctnes=null;
    private $login_data;
    private $mysqli;

    public function __construct($method, $path, $data, $login_data){
        $this->method = $method;
        $this->params = $this->parse_path($path);
        $this->params_count=count($this->params);
        $this->data=$data;
        $this->login_data = $login_data;
    }
    
    private function parse_path($path){
        $offset = 1;
        $i=0;
        $parsed=Array();
        while(($pos=strpos($path,'/',$offset))!==FALSE){
                $parsed[$i]=strtolower(substr($path,$offset,$pos-$offset));
                $i=$i+1;
                $offset=$pos+1;
                $last_pos=$pos;
        }
        $pos=$last_pos;
        if($pos<strlen($path)-1){
                $parsed[$i]=strtolower(substr($path,$pos+1,strlen($path)-$pos-1));
        }
        return $parsed;
    }
    
    private function get_tables(){
	$tables_query = "select TABLE_NAME from information_schema.tables where TABLE_TYPE = 'BASE TABLE' and TABLE_NAME<>'city_lang'";
	$result_set = $this->mysqli->query($tables_query);

	$result = Array();
	for($i=0;$row = $result_set->fetch_assoc();$i++) {
		$result[$i]=$row["TABLE_NAME"];
	}
	
	$result_set->close();
	
	return $result;
    }
    
    private function is_correct(){
        if($this->correctnes==null){
            $this->correctnes = $this->check_addr();
        }
        return $this->correctnes;
    }
    
    private function check_addr(){
        $tables = $this->get_tables();
        if($this->params_count>4){
            return false;
        }
        for($i=0;$i<$this->params_count;$i+=2){
            if(!in_array($this->params[$i],$tables)){
                            throw new Exception('Don\'t found this resource',404);
                        }
        }
        for($i=1;$i<$this->params_count;$i+=2){
                if(is_numeric($this->params[$i])?(float)$this->params[$i]!==(float)(int)$this->params[$i]:true){
                    throw new Exception('Bad URI',404);
                }
                $result_set = $this->mysqli->query('SELECT * FROM ' . $this->params[$i-1]. ' WHERE id = '.$this->params[$i]);
                $row_cnt = $result_set->num_rows;
                $result_set->close(); 
                if($row_cnt==0){
                        throw new Exception('Don\'t found this ID',404);
                }
        }
        return true;
    }
    
    public function get_respone(){  
        
        $this->mysqli = new mysqli($this->login_data->db_host,$this->login_data->db_user_name,$this->login_data->db_user_pass,$this->login_data->db_name);
              //echo  $mysqli->connect_errno;
        if ($this->mysqli->connect_errno!==0){
            http_response_code(500);
            echo 'db connecton error';
            return false;
        }
        
        try{
            $this->is_correct();
            
            switch ($this->method) {
                case 'GET':
                    $request_srt=$this->get_request();
                    $result_set = $this->mysqli->query($request_srt);
                    $res=Array();
                    while ($row=($result_set->fetch_assoc())){
                        $res[$row['id']]=$row['name'];
                    }
                    echo json_encode($res);
                break;
                
                case 'DELETE':
                    $this->mysqli->query($this->delete_request());
                    http_response_code(200);
                break;
            
                case 'POST':
                    $this->mysqli->query($this->post_request());
                    http_response_code(200);
                break;
                
                case 'PUT':
                    $this->mysqli->query($this->put_request());
                    http_response_code(200);
                break;
                default:
                    throw new Exception('Bad Request',400);
            }
            
            
            
        } catch (Exception $ex) {
            echo $ex->getMessage();
            http_response_code($ex->getCode());
            return false;
        } finally {
            $this->mysqli->close();
        }
        
    }

    private function get_request(){
	switch ($this->params_count){
		case 1:
			if($this->params[0]!=='cities'){
				return 'SELECT * FROM '.$this->params[0]; 
			} else{
				throw new Exception('Bad Request',400);
			}
		break;
                
		case 2:
			if($this->params[0]=='countries'){
				return 'SELECT * FROM countries_languages WHERE country_id = '.$this->params[1];
			} else{
				throw new Exception('Bad Request',400);
			}
		break;
                
		case 3:
			if($this->params[0]=='countries'&&$this->params[2]=='cities'){
                            return 'SELECT id, name FROM cities WHERE country_id = '.$this->params[1];
			} else{
                            throw new Exception('Bad Request',400);
                        }
		break;
                
                case 4:
                    if($this->params[0]=='countries'&&$this->params[2]=='cities'){
                        $result_set = $this->mysqli->query('SELECT * FROM cities WHERE country_id = '.$this->params[1].' and id = '.$this->params[3]);
                        $row_cnt = $result_set->num_rows;
                        $result_set->close();
                        if($row_cnt==0){
                            throw new Exception('Bad Request',400);
                        }
                        return 'SELECT languages.id, languages.name FROM languages, city_lang WHERE city_lang.language_id = languages.id and city_lang.city_id ='.$this->params[3];
                    } else{
                        throw new Exception('Bad Request',400);
                    }
                
                default :
                    throw new Exception('Bad Request',400);
	}
    }
    
    private function delete_request(){
        if($this->params_count==2){
            return 'DELETE FROM '.$this->params[0].' WHERE id='.$this->params[1];
        } elseif ($this->params_count==4&&$this->params[0]=='cities'&&$this->params[2]=='languages') {
            return 'DELETE FROM city_lang WHERE city_id = '.$this->params[1].' and language_id = '.$this->params[3];
        } else{
            throw new Exception('Bad Request',400);
        }
    }
    
    private function post_request(){
        if($this->params_count==1&&($this->params[0]=='languages'||$this->params[0]=='countries')){
            $result_set = $this->mysqli->query('SELECT * FROM '.$this->params[0].' WHERE name = \''.$this->data.'\'');
            $row_cnt = $result_set->num_rows;
            $result_set->close();
            if($row_cnt>0){
                throw new Exception('Already exists',304);
            }
            return 'insert into '.$this->params[0].' (name) values (\''.$this->data.'\')';
        } elseif($this->params_count==3&&$this->params[0]=='countries'||$this->params[2]=='cities'){
            return 'insert into cities (name, country_id) values (\''.$this->data.'\', '.$this->params[1].')';
        } else{
            throw new Exception('Bad Request',400);   
        }
    }
    
    private function put_request(){
        if($this->params_count==2){
            return 'UPDATE '.$this->params[0].' SET name = \''.$this->data.'\' WHERE id= '.$this->params[1];
        } elseif ($this->params_count==4&&$this->params[0]=='cities'&&$this->params[2]=='languages') {
            $result_set = $this->mysqli->query('SELECT * FROM city_lang WHERE city_id = '.$this->params[1].' and language_id = '.$this->params[3]);
            $row_cnt = $result_set->num_rows;
            $result_set->close();
            if($row_cnt>0){
                throw new Exception('Already exists',304);
            }
            return 'insert into city_lang (city_id,language_id) values ('.$this->params[1].', '.$this->params[3].')';
        }
    }
    
}

?>