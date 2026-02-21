import frappe

@frappe.whitelist()
def get_po_items(po):

    items = frappe.get_all(
        "Purchase Order Item",
        filters={"parent": po},
        fields=["item_code","item_name","qty","uom"]
    )

    return items