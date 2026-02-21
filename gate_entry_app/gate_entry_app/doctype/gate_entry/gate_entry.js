// Copyright (c) 2026, pankaj yadav and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Gate Entry", {
// 	refresh(frm) {

// 	},
// });



frappe.ui.form.on("Gate Entry", {

    purchase_order(frm) {

        if(!frm.doc.purchase_order) return;

        frappe.call({
            method: "gate_entry_app.api.get_po_items",
            args: { po: frm.doc.purchase_order },
            callback: function(r){

                if(r.message){

                    frm.clear_table("items");

                    r.message.forEach(row => {

                        let child = frm.add_child("items");

                        child.item_code = row.item_code;
                        child.item_name = row.item_name;
                        child.qty = row.qty;
                        child.uom = row.uom;

                    });

                    frm.refresh_field("items");
                }
            }
        });

    }
});