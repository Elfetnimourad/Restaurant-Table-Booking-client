import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";

interface Table {
    id: number;
    table_number: number;
    capacity: number;
    location: string;
}

interface TableForm {
    table_number: string;
    capacity: string;
    location: string;
}

const emptyForm: TableForm = {
    table_number: "",
    capacity: "",
    location: "",
};

const TablesManagement = () => {
    const [tables, setTables] = useState<Table[]>([]);

    const [form, setForm] =
        useState<TableForm>(emptyForm);

    const [open, setOpen] = useState(false);

    const [editingTable, setEditingTable] =
        useState<Table | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ================= GET TABLES =================

    const fetchTables = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:7000/tables",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch tables"
                );
            }

            setTables(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    // ================= OPEN ADD =================

    const handleOpenAdd = () => {
        setEditingTable(null);
        setForm(emptyForm);
        setError("");
        setSuccess("");
        setOpen(true);
    };

    // ================= OPEN EDIT =================

    const handleOpenEdit = (table: Table) => {
        setEditingTable(table);

        setForm({
            table_number: String(table.table_number),
            capacity: String(table.capacity),
            location: table.location,
        });

        setError("");
        setSuccess("");
        setOpen(true);
    };

    // ================= CLOSE =================

    const handleClose = () => {
        setOpen(false);
        setEditingTable(null);
        setForm(emptyForm);
    };

    // ================= INPUT =================

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ================= ADD / UPDATE =================

    const handleSubmit = async () => {
        try {
            setError("");
            setSuccess("");

            if (
                !form.table_number ||
                !form.capacity ||
                !form.location
            ) {
                setError("Please fill in all fields.");
                return;
            }

            const token = localStorage.getItem("token");

            const url = editingTable
                ? `http://localhost:7000/tables/${editingTable.id}`
                : "http://localhost:7000/tables";

            const method = editingTable
                ? "PATCH"
                : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    table_number: Number(
                        form.table_number
                    ),
                    capacity: Number(form.capacity),
                    location: form.location,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to save table"
                );
            }

            if (editingTable) {
                setTables((prev) =>
                    prev.map((table) =>
                        table.id === editingTable.id
                            ? data
                            : table
                    )
                );

                setSuccess(
                    "Table updated successfully."
                );
            } else {
                setTables((prev) => [
                    ...prev,
                    data,
                ]);

                setSuccess(
                    "Table added successfully."
                );
            }

            handleClose();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        }
    };

    // ================= DELETE =================

    const handleDelete = async (table: Table) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete Table ${table.table_number}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:7000/tables/${table.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to delete table"
                );
            }

            setTables((prev) =>
                prev.filter(
                    (item) => item.id !== table.id
                )
            );

            setSuccess(
                "Table deleted successfully."
            );
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#F7F9F8",
                py: {
                    xs: 4,
                    md: 6,
                },
            }}
        >
            <Container maxWidth="xl">

                {/* ================= HEADER ================= */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center",
                        },
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        gap: 2,
                        mb: 4,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{fontWeight:800}}
                        >
                            Tables Management
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            Create and manage your restaurant
                            tables.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAdd}
                        sx={{
                            backgroundColor: "#123D35",
                            fontWeight: 700,
                            "&:hover": {
                                backgroundColor: "#0C2D27",
                            },
                        }}
                    >
                        Add Table
                    </Button>
                </Box>

                {/* ================= ALERTS ================= */}

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                    >
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert
                        severity="success"
                        sx={{ mb: 3 }}
                    >
                        {success}
                    </Alert>
                )}

                {/* ================= TABLES ================= */}

                {loading ? (
                    <Typography>
                        Loading tables...
                    </Typography>
                ) : tables.length === 0 ? (
                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                            textAlign: "center",
                            p: 6,
                        }}
                    >
                        <TableRestaurantIcon
                            sx={{
                                fontSize: 70,
                                color: "#123D35",
                                mb: 2,
                            }}
                        />

                        <Typography
                            variant="h6"
                            sx={{fontWeight:700}}
                        >
                            No tables found
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mt: 1, mb: 3 }}
                        >
                            Add your first restaurant table.
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAdd}
                            sx={{
                                backgroundColor: "#123D35",
                            }}
                        >
                            Add Table
                        </Button>
                    </Card>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                                md: "repeat(3, 1fr)",
                                lg: "repeat(4, 1fr)",
                            },
                            gap: 3,
                        }}
                    >
                        {tables.map((table) => (
                            <Card
                                key={table.id}
                                elevation={2}
                                sx={{
                                    borderRadius: 3,
                                    transition: "0.2s",
                                    "&:hover": {
                                        transform:
                                            "translateY(-3px)",
                                        boxShadow: 5,
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>

                                    {/* Table icon */}

                                    <Box
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 2,
                                            backgroundColor:
                                                "#E8F0ED",
                                            display: "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                            mb: 2,
                                        }}
                                    >
                                        <TableRestaurantIcon
                                            sx={{
                                                fontSize: 35,
                                                color: "#123D35",
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        variant="h6"
                                       sx={{fontWeight:700}}
                                    >
                                        Table{" "}
                                        {
                                            table.table_number
                                        }
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        Capacity:{" "}
                                        {table.capacity}{" "}
                                        {table.capacity === 1
                                            ? "person"
                                            : "people"}
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        Location:{" "}
                                        {table.location}
                                    </Typography>

                                    <Divider
                                        sx={{ my: 2 }}
                                    />

                                    {/* Actions */}

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                    >
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={
                                                <EditIcon />
                                            }
                                            onClick={() =>
                                                handleOpenEdit(
                                                    table
                                                )
                                            }
                                            sx={{
                                                color: "#123D35",
                                                borderColor:
                                                    "#123D35",
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDelete(
                                                    table
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

                {/* ================= DIALOG ================= */}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle
                        sx={{fontWeight:700}}
                    >
                        {editingTable
                            ? "Edit Table"
                            : "Add New Table"}
                    </DialogTitle>

                    <DialogContent>
                        <Stack
                            spacing={2.5}
                            sx={{ mt: 1 }}
                        >

                            {/* Table number */}

                            <TextField
                                fullWidth
                                label="Table Number"
                                name="table_number"
                                type="number"
                                value={
                                    form.table_number
                                }
                                onChange={handleChange}
                            />

                            {/* Capacity */}

                            <TextField
                                fullWidth
                                label="Capacity"
                                name="capacity"
                                type="number"
                                value={
                                    form.capacity
                                }
                                onChange={handleChange}
                            />

                            {/* Location */}

                            <TextField
                                fullWidth
                                select
                                label="Location"
                                name="location"
                                value={
                                    form.location
                                }
                                onChange={handleChange}
                            >
                                <MenuItem value="Indoor">
                                    Indoor
                                </MenuItem>

                                <MenuItem value="Outdoor">
                                    Outdoor
                                </MenuItem>

                                <MenuItem value="Terrace">
                                    Terrace
                                </MenuItem>

                                <MenuItem value="Window">
                                    Window
                                </MenuItem>
                            </TextField>
                        </Stack>
                    </DialogContent>

                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor:
                                    "#123D35",
                                "&:hover": {
                                    backgroundColor:
                                        "#0C2D27",
                                },
                            }}
                        >
                            {editingTable
                                ? "Update Table"
                                : "Add Table"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default TablesManagement;