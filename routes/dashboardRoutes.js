import React, { useEffect, useState } from "react";

const ServiceRequestsPage = () => {
    const [serviceRequests, setServiceRequests] = useState([]);

    useEffect(() => {
        // TODO: Fetch service requests from the API
    }, []);

    const handleStatusChange = (requestId, newStatus) => {
        // TODO: Update the service request status in the API
    };

    return (
        <div>
            <h2>Service Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.name}</td>
                            <td>{request.email}</td>
                            <td>
                                <select
                                    value={request.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            request.id,
                                            e.target.value
                                        )
                                    }>
                                    <option value="Created">Created</option>
                                    <option value="Open">Open</option>
                                    <option value="Released">Released</option>
                                    <option value="Canceled">Canceled</option>
                                    <option value="In process">
                                        In process
                                    </option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceRequestsPage;
