// Copyright (c) 2026, pankaj yadav and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Gate Entry", {
// 	refresh(frm) {

// 	},
// });


frappe.ui.form.on("Gate Entry", {
    refresh(frm) {

        frm.add_custom_button("Get Items", () => {

            // ✅ dialog reference store karo
            let d = new frappe.ui.form.MultiSelectDialog({
                doctype: "Purchase Order",
                target: frm,

                setters: {
                    supplier: null
                },

                add_filters_group: 1,
                date_field: "transaction_date",
                columns: ["name", "supplier", "transaction_date"],

                get_query() {
                    return {
                        filters: {
                            docstatus: 1
                        }
                    };
                },

                action(selections) {

                    if (!selections.length) {
                        frappe.msgprint("Please select Purchase Orders");
                        return;
                    }

                    frappe.call({
                        method: "gate_entry_app.api.get_multiple_po_items",
                        args: { po_list: selections },
                        callback: function(r) {

                            frm.clear_table("items");

                            (r.message || []).forEach(d => {

                                let row = frm.add_child("items");

                                row.item_code = d.item_code;
                                row.item_name = d.item_name;
                                row.qty = d.qty;
                                row.uom = d.uom;
                            });

                            frm.refresh_field("items");

                            // ✅ popup close
                            d.dialog.hide();
                        }
                    });
                }
            });

        });
    }
});
