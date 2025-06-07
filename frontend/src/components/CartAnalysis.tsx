import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import type { CartItem } from '../types';

interface CartAnalysisProps {
    items: CartItem[];
    totalCalories: number;
}

export const CartAnalysis: React.FC<CartAnalysisProps> = ({ items, totalCalories }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Cart Analysis
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Person</TableCell>
                            <TableCell align="right">Calories (per 100g)</TableCell>
                            <TableCell align="right">Total Calories</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                <TableCell align="right">{item.person}</TableCell>
                                <TableCell align="right">{item.caloriesPer100g.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    {(item.caloriesPer100g * item.quantity).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={5} align="right">
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Total Calories:
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {totalCalories.toFixed(2)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}; 