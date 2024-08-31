export default class AppError extends Error{
  constructor(message, statusCode,err){
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      this.success=false;
      this.error=err
      Error.captureStackTrace(this,this.contructor);
      }
      
}