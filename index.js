import express from "express";
import cors from "cors";
import {rooms} from "./rooms.js"

let app = express();


app.use(express.json());
app.use(cors());

let port = 9000;
app.listen(port, ()=>{
    console.log(`Connected to port: ${port}`);
})
app.get("/", (req, res)=>{
    if(!rooms){
        res.status(400).send({message:"We dont to have rooms"})
    }
    res.status(200).send(rooms);
})

app.get("/available-rooms", (req, res)=>{
    let availablerooms = rooms.filter((val)=>val.isBooked==false);
    // console.log(availablerooms)
    if(availablerooms.length===0){
        res.status(400).send({message:"no rooms available at this time"});
    }
    res.status(200).send(availablerooms);
})

app.post("/book-room", (req, res)=>{
    let data = req.body;
    let room_id = data.room_no;
    let roomData1 = rooms.filter((val)=>val.room_no===room_id);
    let ind = rooms.findIndex((val)=>val.room_no===room_id);
    let [roomData] = roomData1;
    let roome = [roomData];
    if(roomData1.length==0){
         return res.status(400).send({message:"room number is incorrect"});
    }
    
    if(roomData.isBooked===true){
        return res.status(400).send({message:"room is already booked"});
    }
    if(roomData.isBooked===false){
        
        data.id = roomData.id;
        data.amentities = roomData.amentities;
        data.isBooked = true;
        data.pricePerHour = roomData.pricePerHour;
        data.roomName =  roomData.roomName;
        data.seatsAvailable = roomData.seatsAvailable;
        data.bookingstatus="booked"
    }
    var dat = [data];
    let final = rooms.splice(ind, 1);
    rooms.push(...dat);
    // console.log(rooms);
    return res.send({bookedRoom:data});
})

app.get("/booked-rooms", (req, res)=>{
    let allRooms =rooms.filter((val)=>val.isBooked===true);
    let bookedRooms = allRooms.map((val)=>{
        return {roomName:val.roomName, customerName:val.customerName, date:val.date, startTime:val.startTime,
        endTime:val.endTime, bookingstatus:val.bookingstatus};
    })
    if(bookedRooms.length==0){
        res.send({message:"All rooms are Available"})
    }
    res.status(200).send(bookedRooms);
})


// 4/ List all customers with booked data

app.get("/booked-customers", (req, res)=>{
    let bookedData = rooms.filter((val)=>val.isBooked===true);
    let customers = bookedData.map((val)=>{
        return{
            CustomerName:val.customerName,
            RoomName:val.roomName,
            Date:val.date,
            StartTime:val.startTime,
            EndTime:val.endTime,
            bookingDate:val.bookingDate
        }
    })
    if(customers.length==0){
        return res.status(400).send({message:"All rooms are available"})
    }
    return res.status(200).send(customers);
})

// 5.  list how many times a customer has booked a room

app.post("/customer-search/:name", (req, res)=>{
    let {name} = req.params;
    if(!name){
        return res.status(400).send({message:"Please enter a customer name"})
    }

    let customerDetails = rooms.filter((val)=>val.customerName==name);
    if(customerDetails.length===0){
        return res.status(400).send({message:"This customer has not booked room before."})
    }
    let bookingDetails = customerDetails.map((val)=>{
        return {
            CustomerName:val.customerName,
            RoomName:val.roomName,
            Date:val.date,
            StartTime:val.startTime,
            EndTime:val.endTime,
            BookingId:val.id,
            BookingDate:val.bookingDate,
            BookingStatus:val.bookingstatus
        }
    })
    let count = customerDetails.length;
    return res.status(200).send({data:bookingDetails, bookedCounts:count});
})