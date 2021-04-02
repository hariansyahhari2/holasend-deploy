import React from "react";
import { Link } from "react-router-dom"

const ErrorCommon = () => {
    return (
        <div className="container">
            <section className="content-header">
                <div className="error-page">
                    <h2 className="headline" style={{color: '#536DFE'}}> 404</h2>
                    <div className="error-content">
                        <h3 style={{color: '#152C5B'}}>
                            <i className="fas fa-exclamation-triangle" style={{color: '#536DFE'}} />{" "}
                            Oops! Page not found.
                        </h3>
                        <p style={{color: '#152C5B'}}>
                            We could not find the page you were looking for.
                            Meanwhile, you may{" "}
                            <Link to="/" style={{ textDecoration: 'none', color: '#536DFE'}}>
                                <a>return to Home.</a>{" "}
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorCommon;
