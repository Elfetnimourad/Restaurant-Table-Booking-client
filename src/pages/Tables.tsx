import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Container,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import TableCard from "../components/TableCard";
import type { Table } from "../components/TableCard";
import { useNavigate } from "react-router-dom";

const Tables = () => {
    interface FormBooking {
     table_id: number;
     booking_date: string;
     booking_time: string;
     guests: number;
     status?: string;
    }
    const [date, setDate] = useState<FormBooking["booking_date"]>("");
    const [time, setTime] = useState<FormBooking["booking_time"]>("");
    const [guests, setGuests] = useState<FormBooking["guests"]>(2);
    const [tables,setTables] = useState<Table[]>([])
    const [searched, setSearched] = useState<boolean>(false);
    const [formBooking,setFormBooking] = useState<FormBooking>({
        table_id: 1,
        booking_date:"",
        booking_time:"",
        guests:2,
        status:"",
    })
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
   useEffect(()=>{
    const getTables = async() =>{
        try{
        const res = await fetch("http://localhost:5000/tables/getTables");
        const data = await res.json();
        setTables(data);
        console.log("Tables",tables)
        }catch(error){
        console.error(error)
        }
    }
    getTables()
   },[])
    /*
     * Temp
    orary data.
     *
     * Later this will come from:
     *
     * GET /tables
     *
     * or from an availability endpoint.
     */


    const handleSearch = () => {
        if (!date || !time || !guests) {
            setSearched(false);
            return;
        }

        setSearched(true);

        /*
         * Later:
         *
         * fetch(
         *   `http://localhost:7000/tables/available?date=${date}&time=${time}&guests=${guests}`
         * )
         */
    };

    const handleBook = async(table: Table) => {
        console.log("Selected table:", table);
      
try{
      setFormBooking({
            table_id:table.id,
            booking_date:date,
            booking_time:time,
            guests:guests,
            status:"pending",
        })
        console.log("formBooking",formBooking)
   const res = await fetch("http://localhost:5000/bookings/addBooking",{
    method:"POST",
    headers:{
        "authorization":`Bearer ${token}`,
        "content-type":"application/json"
    },
    body:JSON.stringify(formBooking)
   });
   const data = await res.json();
   console.log("FormBooking",data)
}catch(error){
   console.error(error)
}

        
        /*
         * Later:
         *
         * navigate(`/bookings/getSingleBooking/create?table=${table.id}`)
         */
    };
console.log("Tables",tables)
    return (
        <Box
            sx={{
                minHeight: "80vh",
                py: {
                    xs: 5,
                    md: 8,
                },
                backgroundColor: "#F7F9F8",
            }}
        >
            <Container maxWidth="lg">

                {/* ================= HEADER ================= */}

                <Box sx={{ mb: 5 }}>
                    <Typography
                        variant="h4"
                        sx={{fontWeight:800}}
                        gutterBottom
                    >
                        Find Your Table
                    </Typography>

                    <Typography color="text.secondary">
                        Choose your date, time, and number of guests
                        to find an available table.
                    </Typography>
                </Box>

                {/* ================= SEARCH ================= */}

                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 3,
                        p: {
                            xs: 3,
                            md: 4,
                        },
                        mb: 5,
                        boxShadow: 2,
                    }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            direction: {
                                xs: "column",
                                md: "row",
                            },
                            alignItems: {
                                xs: "stretch",
                                md: "center",
                            },
                        }}
                    >
                        {/* Date */}

                        <TextField
                            fullWidth
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                        {/* Time */}

                        <TextField
                            fullWidth
                            label="Time"
                            type="time"
                            value={time}
                            onChange={(e) =>
                                setTime(e.target.value)
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                        {/* Guests */}

                        <TextField
                            fullWidth
                            select
                            label="Guests"
                            value={guests}
                            onChange={(e) =>
                                setGuests(Number(e.target.value))
                            }    
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                (number) => (
                                    <MenuItem
                                        key={number}
                                        value={number}
                                    >
                                        {number}{" "}
                                        {number === 1
                                            ? "Guest"
                                            : "Guests"}
                                    </MenuItem>
                                )
                            )}
                        </TextField>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<SearchIcon />}
                            onClick={handleSearch}
                            sx={{
                                minWidth: 150,
                                height: 56,
                                backgroundColor: "#123D35",
                                fontWeight: 700,
                                "&:hover": {
                                    backgroundColor: "#0C2D27",
                                },
                            }}
                        >
                            Search
                        </Button>
                    </Stack>

                    {!date || !time || !guests ? (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 2 }}
                        >
                            Select a date, time, and number of
                            guests to search for available tables.
                        </Typography>
                    ) : null}
                </Box>

                {/* ================= SEARCH MESSAGE ================= */}

                {searched && (
                    <Alert
                        severity="success"
                        sx={{
                            mb: 4,
                            borderRadius: 2,
                        }}
                    >
                        Available tables for {date} at {time} for{" "}
                        {guests}{" "}
                        {Number(guests) === 1
                            ? "guest"
                            : "guests"}.
                    </Alert>
                )}

                {/* ================= TABLES ================= */}

                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h5"
                        sx={{fontWeight:700}}
                    >
                        Available Tables
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Choose the table that suits you best.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            lg: "repeat(3, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    {tables.map((table) => (
                        <TableCard
                            key={table.id}
                            table={table}
                            onBook={handleBook}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Tables;