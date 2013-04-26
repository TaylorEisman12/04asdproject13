function (doc) {
	if (doc._id.substr(0,3) === "red") {
		emit(doc._id.substr(3), {
			"armorColor": doc.armorColor,
			"armorName": doc.armorName,
			"repaired": doc.repaired
		});
	}
};