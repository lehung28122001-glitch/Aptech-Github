import { useState } from "react";

function Customers({customers}){
    return(
        <div className="container">
            <h1 className="page-title">Danh sách khách hàng</h1>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Phòng</th>
                            <th>Ngày nhận phòng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id}>
                                <td>{index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.room}</td>
                                <td>{customer.date || "-"}</td>
                            </tr>
                        ))}
                        {customers.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                                    Chưa có khách hàng nào đặt phòng.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Customers;