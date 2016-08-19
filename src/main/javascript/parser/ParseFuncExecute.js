/**
 * This class executes the SQL
 * @author prashantmahajan 
 */
function ParseFuncExecute () {
	this.g_sReturn = "";
	this.g_sSQL = "";
	this.g_objController = null;
}

/**
 * Returns the Result
 */
ParseFuncIdentifyQueryType.prototype.getResult = function () {
	Object.freeze(this.g_sReturn);
	return this.g_sReturn;
};

ParseFuncIdentifyQueryType.prototype.setController = function (prm_objParseController) {
	this.g_objController = prm_objParseController;
}

/**
 * Sets the Query String 
 */
ParseFuncIdentifyQueryType.prototype.setQuery = function (prm_sSQL) {
	this.g_sSQL = ("" + prm_sSQL).replace(/^\s+|\s+$/gm, '');
};

/**
 * Executes the Function Call
 */
ParseFuncIdentifyQueryType.prototype.startFunction = function () {
	let v_sTypeOfQuery;
	let v_objCreateController;
	try {
		v_sTypeOfQuery = this.g_objController.identifyQueryType(this.g_sSQL);
		switch (v_sTypeOfQuery) {
		case ParseController.INSERT:
			this.g_sReturn = new InsertController().execute(this.g_sSQL);
			break;
		case ParseController.DELETE:
			this.g_objController.executeCreateStatement(this.g_sSQL);
			break;
		case ParseController.UPDATE:
			this.g_objController.executeCreateStatement(this.g_sSQL);
			break;
		case ParseController.SELECT:
			this.g_objController.executeCreateStatement(this.g_sSQL);
			break;
		case ParseController.CREATE:
			this.g_sReturn = new CreateController().execute(this.g_sSQL);
			break;
		default:
			throw "Syntax not supported";
			break;
		}
	} catch (v_exException) {
		if (console) {
			console.log(v_exException);			
		}
	}
};
