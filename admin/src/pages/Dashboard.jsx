import React, {useState} from "react";
import Helmet from "../components/Helmet/Helmet";
import NavBar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import "../style/Dashboard.css";
// Page components
// import HomeContent from "../pages/AddSupplier";
import Customers from "../pages/AllCustomers";
import Products from "../pages/AllProducts";
import Orders from "../pages/OrderManagement";
import Suppliers from "../pages/AllSuppliers";
import Employees from "../pages/AllEmployees";
import HomeContent from "../pages/HomeContent";
import Placeorder from "../pages/Placeorder";
import Orderlists from "../pages/AllOrders";
import {Container} from "reactstrap";

const Dashboard = () => {
    const [activePage, setActivePage] = useState("dashboard");

    // Function to render the current page
    const renderPage = () => {
        switch (activePage) {
            case "dashboard":
                return <HomeContent />
            case "customers":
                return <Customers />;
            case "products":
                return <Products />;
            case "orders":
                return <Orders />;
            case "suppliers":
                return <Suppliers />
            case "employees" :
                return <Employees />
            case "product_list":
                return <Orderlists />
            case "stock":
                return <Placeorder />
            default:
                return <HomeContent />;
        }
    };
    return (
        <Helmet title="Dashboard">
            <div className="dashboard-container">
                <Sidebar onNavigate={setActivePage} />
                <div className="main-content">
                    <NavBar />
                    <div className="page-content">
                        <Container fluid>
                            {renderPage()}
                        </Container>
                        {/* This is where the dynamic content (home, customer, etc.) will load */}
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Dashboard;


//
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
// import Helmet from "../components/Helmet/Helmet";
// import NavBar from "../components/header/navBar";
// import '../style/Dashboard.css';
// import { toast } from "react-toastify";
//
// const Dashboard = () => {
//     const [salesteamMembers, setSalesteamMembers] = useState([]);
//     const [couponCode, setCouponCode] = useState("");
//     const [saleteamCode, setSaleteamCode] = useState("");
//     const [discount, setDiscount] = useState("");
//     const [date, setDate] = useState("");
//     const [promoImage, setPromoImage] = useState(null);
//     const [dailySales, setDailySales] = useState([]);
//     const [monthlySales, setMonthlySales] = useState([]);
//
//     useEffect(() => {
//         fetchSalesTeamMembersOrders();
//         fetchSalesTeamMembers();
//     }, []);
//
//     const fetchSalesTeamMembersOrders = async () => {
//         try {
//             const response = await fetch("http://localhost:5001/api/admin/main/sales/count");
//             const data = await response.json();
//             if (data.data) {
//                 setDailySales(data.data.dailySales ?? []);
//                 setMonthlySales(data.data.monthlySales ?? []);
//             }
//         } catch (error) {
//             console.error("Error fetching sales team members:", error);
//         }
//     };
//
//     const fetchSalesTeamMembers = async () => {
//         try {
//             const response = await fetch("http://localhost:5001/api/admin/main/salesteam");
//             const data = await response.json();
//             if (data.data) {
//                 setSalesteamMembers(data.data);
//             }
//         } catch (error) {
//             console.error("Error fetching sales team members:", error);
//         }
//     };
//
//     // Calculate totals
//     const dailyIssuedTotal = dailySales.reduce((acc, sale) => acc + (sale.issued_sales ?? 0), 0);
//     const dailyOtherTotal = dailySales.reduce((acc, sale) => acc + (sale.other_sales ?? 0), 0);
//     const dailyReturnedTotal = dailySales.reduce((acc, sale) => acc + (sale.returned_sales ?? 0), 0);
//     const dailyCanceledTotal = dailySales.reduce((acc, sale) => acc + (sale.canceled_sales ?? 0), 0);
//
//     const monthlyIssuedTotal = monthlySales.reduce((acc, sale) => acc + (sale.issued_sales ?? 0), 0);
//     const monthlyOtherTotal = monthlySales.reduce((acc, sale) => acc + (sale.other_sales ?? 0), 0);
//     const monthlyReturnedTotal = monthlySales.reduce((acc, sale) => acc + (sale.returned_sales ?? 0), 0);
//     const monthlyCanceledTotal = monthlySales.reduce((acc, sale) => acc + (sale.canceled_sales ?? 0), 0);
//
//     // New formatted data for the charts
//     const DailysalesData = [
//         { name: "Daily Sales", issued: dailyIssuedTotal, other: dailyOtherTotal, returned: dailyReturnedTotal, canceled: dailyCanceledTotal }
//     ];
//
//     const MonthlysalesData = [
//         { name: "Monthly Sales", issued: monthlyIssuedTotal, other: monthlyOtherTotal, returned: monthlyReturnedTotal, canceled: monthlyCanceledTotal }
//     ];
//
//     // Handle coupon submission
//     const handleCouponSubmit = async (e) => {
//         e.preventDefault();
//         if (!couponCode || !saleteamCode || !discount) {
//             alert("Please fill in all fields.");
//             return;
//         }
//         try {
//             const response = await fetch("http://localhost:5001/api/admin/main/coupone", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ couponCode, saleteamCode, discount }),
//             });
//             const data = await response.json();
//             if (data.success) {
//                 toast.success(`Coupon ${couponCode} added successfully!`);
//                 setCouponCode("");
//                 setDiscount("");
//                 setSaleteamCode("");
//             } else {
//                 alert(`Error: ${data.message}`);
//             }
//         } catch (error) {
//             console.error('Error submitting coupon:", error');
//             alert("Failed to add coupon. Please try again.");
//         }
//     };
//
//     // Handle promotion submission
//     const handlePromotionSubmit = async (e) => {
//         e.preventDefault();
//         if (!date || !promoImage) {
//             alert("Please fill in all fields.");
//             return;
//         }
//         toast.success(`Promotion added for ${date}`);
//         setDate("");
//         setPromoImage(null);
//     };
//
//     // Handle image upload
//     const handleImageUpload = (event) => {
//         setPromoImage(URL.createObjectURL(event.target.files[0]));
//     };
//
//     return (
//         <Helmet title={'Dashboard'}>
//             <section>
//                 <Row>
//                     <NavBar />
//                 </Row>
//                 <Container className="dashboard">
//                     <h2>Sales Overview</h2>
//
//                     {/* Sales Data Tables */}
//                     <Row>
//                         <Col md={6}>
//                             <h4>Daily Sales</h4>
//                             <Table striped bordered className="items-table">
//                                 <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Salesperson</th>
//                                     <th>Total Sales (Rs.)</th>
//                                     <th>Issued Sales (Rs.)</th>
//                                     <th>Returned Sales (Rs.)</th>
//                                     <th>Canceled Sales (Rs.)</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {dailySales.map((sale) => (
//                                     <tr key={sale.stID}>
//                                         <td>{sale.stID}</td>
//                                         <td>{sale.salesperson_name}</td>
//                                         <td>{sale.other_sales ?? 0}</td>
//                                         <td>{sale.issued_sales ?? 0}</td>
//                                         <td>{sale.returned_sales ?? 0}</td>
//                                         <td>{sale.canceled_sales ?? 0}</td>
//                                     </tr>
//                                 ))}
//                                 </tbody>
//                             </Table>
//                         </Col>
//
//                         <Col md={6}>
//                             <h4>Monthly Sales</h4>
//                             <Table striped bordered className="items-table">
//                                 <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Salesperson</th>
//                                     <th>Total Sales (Rs.)</th>
//                                     <th>Issued Sales (Rs.)</th>
//                                     <th>Returned Sales (Rs.)</th>
//                                     <th>Canceled Sales (Rs.)</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {monthlySales.map((sale) => (
//                                     <tr key={sale.stID}>
//                                         <td>{sale.stID}</td>
//                                         <td>{sale.salesperson_name}</td>
//                                         <td>{sale.other_sales ?? 0}</td>
//                                         <td>{sale.issued_sales ?? 0}</td>
//                                         <td>{sale.returned_sales ?? 0}</td>
//                                         <td>{sale.canceled_sales ?? 0}</td>
//                                     </tr>
//                                 ))}
//                                 </tbody>
//                             </Table>
//                         </Col>
//                     </Row>
//
//                     {/* Sales Charts */}
//                     <Row>
//                         <Col md={6}>
//                             <h2>Daily Sales Chart</h2>
//                             <ResponsiveContainer width="100%" height={300}>
//                                 <BarChart data={DailysalesData}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="name" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Bar dataKey="issued" fill="#4CAF50" name="Issued Sales" />
//                                     <Bar dataKey="other" fill="#FF9800" name="Other Sales" />
//                                     <Bar dataKey="returned" fill="#F44336" name="Returned Sales" />
//                                     <Bar dataKey="canceled" fill="#9C27B0" name="Canceled Sales" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </Col>
//
//                         <Col md={6}>
//                             <h2>Monthly Sales Chart</h2>
//                             <ResponsiveContainer width="100%" height={300}>
//                                 <BarChart data={MonthlysalesData}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="name" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Bar dataKey="issued" fill="#2196F3" name="Issued Sales" />
//                                     <Bar dataKey="other" fill="#FFEB3B" name="Other Sales" />
//                                     <Bar dataKey="returned" fill="#E91E63" name="Returned Sales" />
//                                     <Bar dataKey="canceled" fill="#795548" name="Canceled Sales" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md={6}>
//                             <h4>Manage Coupons</h4>
//                             <div className="general">
//                                 <Form onSubmit={handleCouponSubmit}>
//                                     <FormGroup>
//                                         <Label>Coupon Code</Label>
//                                         <Input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter coupon code" required />
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Label>Sale Team ID</Label>
//                                         <Input type="select" name="saleteamCode" onChange={(e) => setSaleteamCode(e.target.value)} required>
//                                             <option value="">Select Sale Team</option>
//                                             {salesteamMembers.map((member) => (
//                                                 <option key={member.stID} value={member.stID}>{member.stID} - ({member.employeeName})</option>
//                                             ))}
//                                         </Input>
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Label>Discount Price</Label>
//                                         <Input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Enter discount amount" required />
//                                     </FormGroup>
//                                     <Button color="primary" type="submit">Add Coupon</Button>
//                                 </Form>
//                             </div>
//                         </Col>
//                         <Col md={6}>
//                             <h4>Manage Promotions</h4>
//                             <div className="general">
//                                 <Form onSubmit={handlePromotionSubmit}>
//                                     <FormGroup>
//                                         <Label>Date</Label>
//                                         <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Label>Upload Promotion Image</Label>
//                                         <Input type="file" onChange={handleImageUpload} />
//                                         {promoImage && <img src={promoImage} alt="Promotion" className="promo-img" />}
//                                     </FormGroup>
//                                     <Button color="primary" type="submit">Add Promotion</Button>
//                                 </Form>
//                             </div>
//                         </Col>
//                     </Row>
//
//                 </Container>
//             </section>
//         </Helmet>
//     );
// };
//
// export default Dashboard;
