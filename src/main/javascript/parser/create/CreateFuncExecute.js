/**
 * Executes the Create Statement.
 * //Not doing the create DB right now
 * @author prashantmahajan
 */

function CreateFuncExecute () {
	this.g_sSQL;
	this.g_sLowerCaseSQL;
	this.g_Return;
	this.g_sTableName;
	this.g_arrAllColumns = [];
	this.g_objCreateController;
}

CreateFuncExecute.TABLE = "table";

CreateFuncExecute.prototype.getResult = function () {
	Object.freeze(this.g_Return);
	return this.g_Return;
};

CreateFuncExecute.prototype.setQuery = function (prm_sSQL) {
	this.g_sSQL = this.trim(prm_sSQL);
	this.g_sLowerCaseSQL = this.g_sSQL.toLowerCase();
};
CreateFuncExecute.prototype.setController = function (prm_objCreatController) {
	this.g_objCreateController = prm_objCreatController;
};

CreateFuncExecute.prototype.startFunction = function () {
	try {
		this.parseSQL();
		this.createSQLTable();
	} catch (v_exException) {
		this.log(v_exException);
	}
};

CreateFuncExecute.prototype.createSQLTable = function () {
	let v_iItr;
	let v_sKey;
	let v_objRow;
	try {
		v_sKey = "browserdb.meta." + window.location.hostname + "." + this.g_sTableName + ".definition";
		localStorage[v_sKey] = this.g_arrAllColumns;
		this.g_Return = [];
		v_objRow = {};
		this.g_Return.push(v_objRow);
		for (v_iItr in this.g_arrAllColumns) {
			v_objRow[this.g_arrAllColumns[v_iItr]] = null;
		}
	} catch (v_exException) {
		this.log(v_exException);
	}
};

CreateFuncExecute.prototype.parseSQL = function () {
	this.findCreateStatement();
	this.findTableKeyword();
	this.findTableName();
	this.findTheTableColumns();
};

CreateFuncExecute.prototype.findCreateStatement = function () {
	if (this.g_sLowerCaseSQL.indexOf(CreateController.CREATE) == 0) {
		this.g_sLowerCaseSQL = this.g_sLowerCaseSQL.replace(CreateController.CREATE, "");
		this.g_sLowerCaseSQL = this.trim(this.g_sLowerCaseSQL);
	} else {
		this.log("Missing " + CreateController.CREATE  + " keyword in the SQL : " + this.g_sSQL);
	}
};

CreateFuncExecute.prototype.findTableKeyword = function () {
	if (this.g_sLowerCaseSQL.indexOf(CreateFuncExecute.TABLE) == 0) {
		this.g_sLowerCaseSQL = this.g_sLowerCaseSQL.replace(CreateFuncExecute.TABLE, "");
		this.g_sLowerCaseSQL = this.trim(this.g_sLowerCaseSQL);
	} else {
		this.log("Missing " + CreateFuncExecute.TABLE  + " keyword in the SQL : " + this.g_sSQL);
	}
};

CreateFuncExecute.prototype.findTheTableColumns = function () {
	let v_iI;
	let v_arrAllColumns;
	this.g_sLowerCaseSQL = this.g_sLowerCaseSQL.replace("(", "").replace(")", "");
	this.g_sLowerCaseSQL = this.trim(this.g_sLowerCaseSQL);
	v_arrAllColumns = this.g_sLowerCaseSQL.split(",");
	for (v_iI = 0; v_iI < v_arrAllColumns.length; v_iI++) {
		this.g_arrAllColumns.push(this.trim(v_arrAllColumns[v_iI]));
	}
};

CreateFuncExecute.prototype.findTableName = function () {
	this.g_sTableName = this.g_sLowerCaseSQL.split(" ")[0];
	this.g_sLowerCaseSQL = this.g_sLowerCaseSQL.replace(this.g_sTableName, "");
	this.g_sLowerCaseSQL = this.trim(this.g_sLowerCaseSQL);
};

CreateFuncExecute.prototype.trim = function (prm_sString) {
	if (null == prm_sString) {
		return null;
	} else {
		return ("" + prm_sString).replace(/^\s+|\s+$/gm, '');
	}
};

CreateFuncExecute.prototype.log = function (prm_sMesssage) {
	if (console) {
		console.log(prm_sMesssage);
	}
};