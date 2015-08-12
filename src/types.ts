export interface ILoggerOpts  {
    pack: {
        name : string
        ver: string 
    }
    tags : string[]
}

export interface ILogger {
    write(obj: Object) : void
}

