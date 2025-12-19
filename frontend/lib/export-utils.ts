// Excel Export Utility for Reports
// Uses SheetJS (xlsx) library format but generates CSV for zero dependencies

export interface ExportColumn {
    key: string;
    header: string;
    format?: 'currency' | 'date' | 'number' | 'text';
}

export function exportToCSV<T extends Record<string, any>>(
    data: T[],
    columns: ExportColumn[],
    filename: string
): void {
    // Generate CSV header
    const header = columns.map(col => `"${col.header}"`).join(',');

    // Generate CSV rows
    const rows = data.map(row => {
        return columns.map(col => {
            let value = row[col.key];

            // Format value based on column type
            switch (col.format) {
                case 'currency':
                    value = typeof value === 'number' ? `₹${value.toFixed(2)}` : value;
                    break;
                case 'date':
                    value = value ? new Date(value).toLocaleDateString('en-IN') : '';
                    break;
                case 'number':
                    value = typeof value === 'number' ? value.toString() : value;
                    break;
                default:
                    value = value?.toString() || '';
            }

            // Escape quotes and wrap in quotes
            return `"${(value || '').replace(/"/g, '""')}"`;
        }).join(',');
    });

    // Combine header and rows
    const csv = [header, ...rows].join('\n');

    // Create and trigger download
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Predefined export configurations
export const exportConfigs = {
    salesReport: [
        { key: 'date', header: 'Date', format: 'date' as const },
        { key: 'orders', header: 'Total Orders', format: 'number' as const },
        { key: 'revenue', header: 'Revenue', format: 'currency' as const },
        { key: 'avgOrderValue', header: 'Avg Order Value', format: 'currency' as const },
        { key: 'cashAmount', header: 'Cash', format: 'currency' as const },
        { key: 'upiAmount', header: 'UPI', format: 'currency' as const },
    ],

    ordersReport: [
        { key: 'shortId', header: 'Order ID' },
        { key: 'createdAt', header: 'Date/Time', format: 'date' as const },
        { key: 'customerName', header: 'Customer' },
        { key: 'items', header: 'Items' },
        { key: 'totalAmount', header: 'Total', format: 'currency' as const },
        { key: 'paymentMethod', header: 'Payment' },
        { key: 'status', header: 'Status' },
    ],

    topItemsReport: [
        { key: 'name', header: 'Item Name' },
        { key: 'category', header: 'Category' },
        { key: 'quantity', header: 'Qty Sold', format: 'number' as const },
        { key: 'revenue', header: 'Revenue', format: 'currency' as const },
    ],

    shiftsReport: [
        { key: 'date', header: 'Date', format: 'date' as const },
        { key: 'staffName', header: 'Staff' },
        { key: 'startTime', header: 'Start Time' },
        { key: 'endTime', header: 'End Time' },
        { key: 'openingCash', header: 'Opening Cash', format: 'currency' as const },
        { key: 'closingCash', header: 'Closing Cash', format: 'currency' as const },
        { key: 'expectedCash', header: 'Expected', format: 'currency' as const },
        { key: 'variance', header: 'Variance', format: 'currency' as const },
    ],
};

// Helper to download any report
export function downloadReport(
    reportType: keyof typeof exportConfigs,
    data: Record<string, any>[],
    shopName: string = 'CafeOS'
) {
    const config = exportConfigs[reportType];
    const filename = `${shopName}_${reportType}`;
    exportToCSV(data, config, filename);
}
