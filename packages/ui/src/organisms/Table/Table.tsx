import React from 'react';
import {
	Table as MuiTable,
	TableProps as MuiTableProps,
	TableHead,
	TableHeadProps,
	TableBody,
	TableBodyProps,
	TableRow,
	TableRowProps,
	TableCell,
	TableCellProps,
} from '@mui/material';

/**
 * Table component wrapper
 * 
 * BU-agnostic table that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type TableProps = MuiTableProps;
export type { TableHeadProps, TableBodyProps, TableRowProps, TableCellProps };

export const Table: React.FC<TableProps> = (props) => {
	return <MuiTable {...props} />;
};

export { TableHead, TableBody, TableRow, TableCell };

