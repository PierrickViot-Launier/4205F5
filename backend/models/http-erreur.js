class HttpErreur extends Error {

    /**
     * @type {Number}
     */
    code = -1;

    /**
     * @type {String}
     */
    internalErrorMessage = "";

    constructor(message, code, internalErrorMessage){
        super(message);
        this.code = code;
        this.internalErrorMessage = internalErrorMessage;

        //on check si nous sommes en "debug" mode, en en "dev" mode, et on ajoute le message d'erreur interne au message d'erreur potentiellement donné à un client externe
        if (true && !!internalErrorMessage) {
            this.message += " : " + internalErrorMessage;
        }
        
    }
}

module.exports = HttpErreur;