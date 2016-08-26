/**
 * Executes the Insert Statement.
 * @author prashantmahajan
 */

function InsertFuncExecute () {
	this.g_sKey;
	this.g_sSQL;
	this.g_sLowerCaseSQL;
	this.g_Return = null;
	this.g_sTableName;
	this.trim = null;
	this.log = null;
	this.g_objInsertController;
	this.g_arrAllColumns = [];
	this.g_arrData = [];
}

InsertFuncExecute.prototype.getResult = function () {
	Object.freeze(this.g_Return);
	return this.g_Return;
};

InsertFuncExecute.prototype.setQuery = function (prm_sSQL) {
	this.g_sSQL = this.trim(prm_sSQL);
	this.g_sLowerCaseSQL = this.g_sSQL.toLowerCase();
};

InsertFuncExecute.prototype.setController = function (prm_objInsertontroller) {
	this.g_objInsertController = prm_objInsertontroller;
	this.trim = this.g_objInsertController.trim;
	this.log = this.g_objInsertController.log;
};

InsertFuncExecute.prototype.startFunction = function () {
	try {
		this.parseSQL();
	} catch (v_exException) {
		this.log(v_exException);
	}
};

InsertFuncExecute.prototype.insertData = function () {
	let v_sKey;
	let v_sEarlierData;
	let v_arrRows = [];
	try {
		if (null == this.g_arrData) {
		} else if (0 == this.g_arrData) {
		} else {
			v_sKey = "browserdb.meta." + window.location.hostname + "." + this.g_sTableName + ".data";
			v_sEarlierData = localStorage[v_sKey];
			if (null != v_sEarlierData) {
				v_arrRows = JSON.parse(v_sEarlierData);
				if (v_arrRows.length == 0) {
					v_arrRows = this.g_arrData;
				} else {
					v_arrRows = v_arrRows.concat(this.g_arrData);
				}
			} else {
				v_arrRows = this.g_arrData;
			}
			localStorage[v_sKey] = JSON.stringify(v_arrRows);
			this.g_Return = v_arrRows;
		}
	} catch (v_exException) {
		this.log(v_exException);
	}
};

InsertFuncExecute.prototype.parseSQL = function () {
	try {
		this.findTheInsertStatement();
		this.findTheTableName();
		if(this.checkIfTheTableExists()) {
			this.getTheColumnSequence();
			this.findTheData();
			this.insertData();
		} else {
			this.log("The specified table : " + this.g_sTableName + " doesn't exist in the local Database");
		}
	} catch (v_exException) {
		this.log(v_exException);
	}
};

InsertFuncExecute.prototype.findTheInsertStatement = function () {
	if (this.g_sLowerCaseSQL.indexOf(InsertController.INSERT) == 0) {
		this.g_sLowerCaseSQL = this.g_sLowerCaseSQL.replace(InsertController.INSERT, "");
		this.g_sLowerCaseSQL = this.trim(this.g_sLowerCaseSQL);
	} else {
		this.log("Missing '" + CreateController.CREATE  + "' keyword in the SQL : " + this.g_sSQL);
	}
	
	if (this.g_sLowerCaseSQL.indexOf(InsertController.INTO) == 0) {
		this.g_sLowerCaseSQL = this.g_sLowerCaseSQL.replace(InsertController.INTO, "");
		this.g_sLowerCaseSQL = this.trim(this.g_sLowerCaseSQL);
	} else {
		this.log("Missing '" + InsertController.INTO.toUpperCase()  + "' keyword in the SQL : " + this.g_sSQL);
	}
};

InsertFuncExecute.prototype.findTheTableName = function () {
	this.g_sTableName = this.g_sLowerCaseSQL.split(" ")[0];
	this.g_sLowerCaseSQL = this.g_sLowerCaseSQL.replace(this.g_sTableName, "");
	this.g_sLowerCaseSQL = this.trim(this.g_sLowerCaseSQL);
};

InsertFuncExecute.prototype.checkIfTheTableExists = function () {
	let v_bReturn;
	let v_sKey;
	this.g_sKey = v_sKey = "browserdb.meta." + window.location.hostname + "." + this.g_sTableName + ".definition";
	Object.freeze(this.g_sKey);
	if (null == localStorage[v_sKey]) {
		v_bReturn = false;
	} else {
		v_bReturn = true;
	}
	return v_bReturn;
};

InsertFuncExecute.prototype.getTheColumnSequence = function () {
	let v_ptrThis;
	let v_arrSQLColumns;
	let v_arrDefinitionColumns;
	let v_fnGetDefaultSequence;
	let v_fnIsSequenceThereInTheInputSQL;
	let v_fnGetSequenceFromInputSQL;
	let v_fnValidateTheSQLSequence;
	
	v_fnGetDefaultSequence = function () {
		let v_iIndex;
		v_ptrThis.g_arrAllColumns.splice(0, v_ptrThis.g_arrAllColumns.length);//Clear Array
		v_arrDefinitionColumns = localStorage[v_ptrThis.g_sKey].split(",");
		for (v_iIndex in v_arrDefinitionColumns) {
			v_arrDefinitionColumns[v_iIndex] = v_ptrThis.trim(v_arrDefinitionColumns[v_iIndex]);
			if (v_arrDefinitionColumns[v_iIndex].indexOf(";") > 0) {
				v_arrDefinitionColumns[v_iIndex] = v_arrDefinitionColumns[v_iIndex].replace(";", "");
			}
			v_ptrThis.g_arrAllColumns.push(v_arrDefinitionColumns[v_iIndex]);
		}
	};

	v_fnIsSequenceThereInTheInputSQL = function () {
		return v_ptrThis.g_sLowerCaseSQL.indexOf("(") == 0;
	};

	v_fnGetSequenceFromInputSQL = function () {
		let v_iPosition;
		let v_sColumns;
		v_iPosition = v_ptrThis.g_sLowerCaseSQL.indexOf(")");
		v_sColumns = v_ptrThis.g_sLowerCaseSQL.substring(1, v_iPosition);
		v_ptrThis.g_sLowerCaseSQL = v_ptrThis.g_sLowerCaseSQL.substring(v_iPosition + 1);
		v_ptrThis.g_sLowerCaseSQL  = v_ptrThis.trim(v_ptrThis.g_sLowerCaseSQL);
		v_arrSQLColumns = v_sColumns.split(",");
	};

	v_fnValidateTheSQLSequence = function () {
		let v_iIndex;
		let v_sColumnName;
		v_ptrThis.g_arrAllColumns.splice(0, v_ptrThis.g_arrAllColumns.length);//Clear Array
		for (v_iIndex in v_arrSQLColumns) {
			v_sColumnName = v_arrSQLColumns[v_iIndex];
			v_sColumnName = v_ptrThis.trim(v_sColumnName);
			if (v_arrDefinitionColumns.indexOf(v_sColumnName) >= 0) {
				v_ptrThis.g_arrAllColumns.push(v_sColumnName);
			} else {
				throw("Column : " + v_sColumnName + " is not found in the Table definition");
			}
		}
	};

	v_ptrThis = this;
	v_fnGetDefaultSequence();
	if (v_fnIsSequenceThereInTheInputSQL()) {
		v_fnGetSequenceFromInputSQL();
		v_fnValidateTheSQLSequence();
	}	
};

InsertFuncExecute.prototype.findTheData = function () {
	this.g_arrData = this.g_objInsertController.findTheDataInSQL(this.g_sSQL, this.g_sLowerCaseSQL, this.g_arrAllColumns);
}


