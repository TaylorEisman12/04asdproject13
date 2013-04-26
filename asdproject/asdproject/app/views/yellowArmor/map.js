function (doc) {
	if (doc._id.substr(0,6) === "yellow") {
		emit(doc._id.substr(6), {
			"armorColor": doc.armorColor,
			"armorName": doc.armorName,
			"repaired": doc.repaired
		});
	}
};