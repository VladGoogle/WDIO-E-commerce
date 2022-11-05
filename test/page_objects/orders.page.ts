class OrdersPage {

    get ordersTable() {
        return $('#my-orders-table')
    }

    get tableItems() {
        return this.ordersTable.$$('tr')
    }

    get orderIdColumn() {
        return $$('td.id')
    }

    get orderDateColumn() {
        return $$('td.date')
    }

    get orderShippingColumn() {
        return $$('td.shipping')
    }

    get orderTotalColumn() {
        return $$('td.total')
    }

    get orderStatusColumn() {
        return $$('td.status')
    }

    get viewOrderBtn() {
        return $$('a.view')
    }

    get reorderBtn() {
        return $$('a.order')
    }

    get itemsLimiter() {
        return $('#limiter')
    }

    get printBtn() {
        return $('a.print')
    }

    get orderDate() {
        return $('.order-date')
    }

    get orderStatus() {
        return $('.order-status')
    }

    get orderPageTitle() {
        return $('.page-title')
    }

    get orderItems() {
        return $$('tr[id*="order-item-row"]')
    }

    get orderItemName() {
        return $$('td.name')
    }

    get orderItemSKU() {
        return $$('td.sku')
    }

    get orderItemPrice() {
        return $$('td.price')
    }

    get orderItemQty() {
        return $$('/html/body/div[2]/main/div[2]/div[1]/div[2]/div[2]/table/tbody/tr/td[4]/ul/li')
    }

    get orderItemSubtotal() {
        return $$('td.subtotal')
    }
}

export default new OrdersPage()