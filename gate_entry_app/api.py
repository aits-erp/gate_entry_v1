import frappe

@frappe.whitelist()
def get_multiple_po_items(po_list):

    if isinstance(po_list, str):
        po_list = frappe.parse_json(po_list)

    items = []

    for po in po_list:
        po_items = frappe.get_all(
            "Purchase Order Item",
            filters={"parent": po},
            fields=["item_code","item_name","qty","uom"]
        )
        items.extend(po_items)

    return items

    if isinstance(po_list, str):
        po_list = frappe.parse_json(po_list)

    items = []

    for po in po_list:

        po_items = frappe.get_all(
            "Purchase Order Item",
            filters={"parent": po},
            fields=["item_code","item_name","qty","uom"]
        )

        items.extend(po_items)

    return items
