function (doc) {
	if (doc._id.substr(0,5) === "green") {
		emit(doc._id.substr(5), {
			"armorColor": doc.armorColor,
			"armorName": doc.armorName,
			"repaired": doc.repaired
		});
	}
};