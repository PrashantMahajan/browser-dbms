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
ParseFuncExecute.prototype.getResult = function () {
	Object.freeze(this.g_sReturn);
	return this.g_sReturn;
};

ParseFuncExecute.prototype.setController = function (prm_objParseController) {
	this.g_objController = prm_objParseController;
}

/**
 * Sets the Query String 
 */
ParseFuncExecute.prototype.setQuery = function (prm_sSQL) {
	this.g_sSQL = ("" + prm_sSQL).replace(/^\s+|\s+$/gm, '');
};

/**
 * Executes the Function Call
 */
ParseFuncExecute.prototype.startFunction = function () {
	let v_sTypeOfQuery;
	let v_objCreateController;
	try {
		v_sTypeOfQuery = this.g_objController.identifyQueryType(this.g_sSQL);
		switch (v_sTypeOfQuery) {
		case ParseController.INSERT:
			if (InsertController) {
				this.g_sReturn = new InsertController().execute(this.g_sSQL);
			} else {
				this.log("InsertController not defined - please include the JS file");
			}
			break;
		case ParseController.DELETE:
			this.g_objController.executeCreateStatement(this.g_sSQL);
			break;
		case ParseController.UPDATE:
			this.g_objController.executeCreateStatement(this.g_sSQL);
			break;
		case ParseController.SELECT:
			if (SelectController) {
				this.g_sReturn = new SelectController().execute(this.g_sSQL);
			} else {
				this.log("SelectController not defined - please include the JS file");
			}
			break;
		case ParseController.CREATE:
			if (CreateController) {
				this.g_sReturn = new CreateController().execute(this.g_sSQL);
			} else {
				this.log("CreateController not defined - please include the JS file");
			}
			break;
		default:
			throw "Syntax not supported";
			break;
		}
	} catch (v_exException) {
		this.log(v_exException);
	}
};

ParseFuncExecute.prototype.log = function (prm_sMessage) {
	if (console) {
		console.log(prm_sMessage);			
	}
};
