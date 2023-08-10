let express = require("express");
let app = express();


let cors = require("cors");

app.use(express.json());
app.use(cors());

let port = 9000;
app.listen(port, ()=>{
    console.log(`Connected to port: ${port}`);
})



let rooms = [
    {
        id:0,
        room_no:600,
        pricePerHour:500,
        amentities:["AC", "washing machine", "Telephone"],
        isBooked:false,
        roomName:"Single Room",
        seatsAvailable:5,
        customerName:"",
        startTime:"",
        endTime:"",
        date:"",
        bookingstatus:"not booked",
        bookingDate:""
    },
    {
        id:1,
        room_no:601,
        pricePerHour:600,
        amentities:["AC", "washing machine", "Telephone", "Television"],
        isBooked:false,
        roomName:"Single Room",
        seatsAvailable:6,
        customerName:"",
        startTime:"",
        endTime:"",
        date:"",
        bookingstatus:"not booked",
        bookingDate:""
    },
    {
        id:2,
        room_no:602,
        pricePerHour:400,
        amentities:["washing machine", "Telephone"],
        isBooked:false,
        roomName:"Single Room",
        seatsAvailable:4,
        customerName:"",
        startTime:"",
        endTime:"",
        date:"",
        bookingstatus:"not booked",
        bookingDate:""
    },
    {
        id:3,
        room_no:605,
        pricePerHour:900,
        amentities:["AC", "washing machine", "Telephone", "AC"],
        isBooked:true,
        roomName:"Double Room",
        seatsAvailable:7,
        customerName:"vijay",
        startTime:"5PM",
        endTime:"12AM",
        date:"15-10-2023",
        bookingstatus:"booked",
        bookingDate:"8-8-2023"
    },
    {
        id:4,
        room_no:606,
        pricePerHour:1100,
        amentities:["AC", "washing machine", "Telephone", "AC", "Fridge"],
        isBooked:false,
        roomName:"Double Room",
        seatsAvailable:9,
        customerName:"",
        startTime:"",
        endTime:"",
        date:"",
        bookingstatus:"not booked",
        bookingDate:""
    },
    {
        id:5,
        room_no:607,
        pricePerHour:1100,
        amentities:["AC", "washing machine", "Telephone", "AC", "Fridge"],
        isBooked:true,
        roomName:"Double Room",
        seatsAvailable:11,
        customerName:"arthy",
        startTime:"10AM",
        endTime:"12PM",
        date:"29-08-2023",
        bookingstatus:"pending payment",
        bookingDate:"01-08-2022"
    },
    {
        id:6,
        room_no:608,
        pricePerHour:1000,
        amentities:["AC", "Telephone", "AC", "Fridge"],
        isBooked:true,
        roomName:"Double Room",
        seatsAvailable:3,
        customerName:"arthy",
        startTime:"8AM",
        endTime:"12PM",
        date:"16-11-2023",
        bookingstatus:"booked",
        bookingDate:"10-09-2023"
    },
    {
        id:7,
        room_no:609,
        pricePerHour:1100,
        amentities:["AC", "washing machine", "Telephone", "AC", "Fridge"],
        isBooked:true,
        roomName:"Double Room",
        seatsAvailable:8,
        customerName:"sanjay",
        startTime:"10AM",
        endTime:"5PM",
        date:"15-10-2023",
        bookingstatus:"payment pending",
        bookingDate:"15-07-2023"
    },
    {
        id:8,
        room_no:610,
        pricePerHour:1500,
        amentities:["AC", "washing machine", "Telephone", "AC", "Fridge", "Luggages storage"],
        isBooked:false,
        roomName:"Family room",
        seatsAvailable:15,
        customerName:"",
        startTime:"",
        endTime:"",
        date:"",
        bookingstatus:"not booked"
    },
    {
        id:9,
        room_no:611,
        pricePerHour:1800,
        amentities:["AC", "washing machine", "Telephone", "AC", "Fridge", "Luggages storage", "extra bed"],
        isBooked:false,
        roomName:"Family room",
        seatsAvailable:13,
        customerName:"",
        startTime:"",
        endTime:"",
        date:"",
        bookingstatus:"not booked"
    },
    {
        id:10,
        room_no:612,
        pricePerHour:1600,
        amentities:["AC", "washing machine", "Telephone", "AC", "Fridge"],
        isBooked:false,
        roomName:"Family room",
        seatsAvailable:13,
        customerName:"",
        startTime:"",
        endTime:"",
        date:"",
        bookingstatus:"not booked"
    },
    {
        id:11,
        room_no:603,
        pricePerHour:700,
        amentities:["washing machine", "Telephone", "AC"],
        isBooked:true,
        roomName:"Single Room",
        seatsAvailable:2,
        customerName:"pavithra",
        startTime:"12AM",
        endTime:"12PM",
        date:"17-11-2023",
        bookingstatus:"booked",
        bookingDate:"11-11-2023"
    },
    {
        id:12,
        room_no:604,
        pricePerHour:650,
        amentities:["Telephone", "AC"],
        isBooked:true,
        roomName:"Single Room",
        seatsAvailable:3,
        customerName:"bala",
        startTime:"9AM",
        endTime:"1PM",
        date:"10-12-2023",
        bookingstatus:"payment pending",
        bookingDate:"19-10-2023"
    }

]

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
    let dat = [data];
    let final = rooms.splice(ind, 1);
    rooms = [...rooms, ...dat];
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