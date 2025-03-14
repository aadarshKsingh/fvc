export interface File {
    upload_time: string;       
    file_url: string;          
    filename: string;          
    file_hash: string;         
    file_size: number;         
    expiration_time: string;   
    mime_type: string;         
  }
  
  export interface Files {
    files: File[];  
    account_id: string;
  }