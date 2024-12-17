import React from "react";
import "./MyORderPage.css";
import Table from "../common/Table";

const MyOrderPage = ( { cart } ) => {
  return (
    <section className="align_center myorder_page">
      <Table headings={["Order", "Products", "Total", "Status"]}>
        <tbody>
            <tr>
                <td>1</td>
                <td>Iphone 14 Pro, Power Bank</td>
                <td>$1299</td>
                <td>Shipped</td>
            </tr>
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrderPage;
