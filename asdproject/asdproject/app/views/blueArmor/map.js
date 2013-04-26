function (doc) {
	if (doc._id.substr(0,4) === "blue") {
		emit(doc._id.substr(4), {
			"armorColor": doc.armorColor,
			"armorName": doc.armorName,
			"repaired": doc.repaired
		});
	}
};