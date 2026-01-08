import React from 'react';
import {
	Accordion as MuiAccordion,
	AccordionProps as MuiAccordionProps,
	AccordionSummary,
	AccordionSummaryProps,
	AccordionDetails,
	AccordionDetailsProps,
} from '@mui/material';

/**
 * Accordion component wrapper
 * 
 * BU-agnostic accordion that uses theme tokens exclusively.
 * No hardcoded colors, spacing, or typography values.
 */
export type AccordionProps = MuiAccordionProps;
export type { AccordionSummaryProps, AccordionDetailsProps };

export const Accordion: React.FC<AccordionProps> = (props) => {
	return <MuiAccordion {...props} />;
};

export { AccordionSummary, AccordionDetails };

