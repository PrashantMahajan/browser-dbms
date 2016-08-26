/**
 * Internal Functioncall to find the Data in the sql query
 * @author prashantmahajan
 */
function InsertFuncFindTheDataInSQL () {
	this.g_arrReturn = [];
	this.g_objInsertController = null;
	this.trim = null;
	this.log = null;
	this.g_sSQL = null;
	this.g_sParsedSQL = null;
}

InsertFuncFindTheDataInSQL.VALUE_SQL = 1;
InsertFuncFindTheDataInSQL.MULTI_VALUE = 2;
InsertFuncFindTheDataInSQL.SUB_SELECT = 3;

InsertFuncFindTheDataInSQL.prototype.setController = function (prm_objInsertController) {
	this.g_objInsertController = prm_objInsertController;
	this.trim = this.g_objInsertController.trim;
	this.log = this.g_objInsertController.log;
};

InsertFuncFindTheDataInSQL.prototype.getResult = function () {
	return this.g_arrReturn;
};

InsertFuncFindTheDataInSQL.prototype.setQuery = function (prm_sSQL) {
	this.g_sSQL = prm_sSQL;
};

InsertFuncFindTheDataInSQL.prototype.setParsedSQL = function (prm_sParsedSQL) {
	this.g_sParsedSQL = prm_sParsedSQL;
};

InsertFuncFindTheDataInSQL.prototype.startFunction = function () {
	try {
		switch (this.getInsertType()) {
		case InsertFuncFindTheDataInSQL.VALUE_SQL:
			this.findDataForSimpleValueSQL();
			break;
		case InsertFuncFindTheDataInSQL.MULTI_VALUE:
			this.findDataForMultiValueSQL();
			break;
		case InsertFuncFindTheDataInSQL.SUB_SELECT:
			//this.findDataForSelectStatement();
			this.log("SubSelect SQL Insert not suported right now " + this.g_sSQL);
			break;
		default:
			this.log("SQL Insert not suported : " + this.g_sSQL);
		}
	} catch (v_exException) {
		this.log(v_exException);
	}
};

InsertFuncFindTheDataInSQL.prototype.getInsertType = function () {
	let v_iReturn;
	try {
		if (this.g_sParsedSQL.indexOf("values") == 0) {
			if (this.g_sParsedSQL.replace(/\)\sUNION/gi, "").length == this.g_sParsedSQL.length) {
				v_iReturn = InsertFuncFindTheDataInSQL.VALUE_SQL;
			} else {
				v_iReturn = InsertFuncFindTheDataInSQL.MULTI_VALUE;				
			}
		} else if (this.g_sParsedSQL.indexOf("select") == 0) {
			v_iReturn = InsertFuncFindTheDataInSQL.SUB_SELECT;
		}
	} catch (v_exException) {
		this.log(v_exException);
	}
	return v_iReturn;
};

InsertFuncFindTheDataInSQL.prototype.findDataForMultiValueSQL = function () {
	let v_iSubStringIndex;
	let v_sValues;
	try {
		v_iSubStringIndex = this.g_sSQL.toLowerCase().indexOf(this.g_sParsedSQL);
		v_sValues = this.g_sSQL.substring(v_iSubStringIndex);
		v_sValues = this.trim(v_sValues);
		v_sValues = v_sValues.substring(v_sValues.toLowerCase().indexOf("values") + "values".length)
		v_sValues = v_sValues.replace(/\)\sUNION\sALL\s\(/gi, "),(");
		v_sValues = v_sValues.replace(/\)\sUNION\s\(/gi, "),(");
		v_sValues = this.trim(v_sValues);
		v_sValues = v_sValues.replace(/\(/g, "[");
		v_sValues = v_sValues.replace(/\)/g, "]");
		this.g_arrReturn = JSON.parse("[" + v_sValues + "]");
	} catch (v_exException) {
		this.log(v_exException);
	}
};

InsertFuncFindTheDataInSQL.prototype.findDataForSimpleValueSQL = function () {
	let v_iSubStringIndex;
	let v_sValues;
	try {
		v_iSubStringIndex = this.g_sSQL.toLowerCase().indexOf(this.g_sParsedSQL);
		v_sValues = this.g_sSQL.substring(v_iSubStringIndex);
		v_sValues = this.trim(v_sValues);
		v_sValues = v_sValues.substring(v_sValues.toLowerCase().indexOf("values") + "values".length)
		v_sValues = this.trim(v_sValues);
		v_sValues = v_sValues.replace(/\(/g, "[");
		v_sValues = v_sValues.replace(/\)/g, "]");
		this.g_arrReturn = JSON.parse(v_sValues);
	} catch (v_exException) {
		this.log(v_exException);
	}
};
