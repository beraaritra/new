import React from "react";
import styles from "./business.module.css";
export const Business = () => {
  return (
    <section className={styles.businesssec}>
      <div class="container mx-auto">
        <div className={styles.heading}>
          <h1>
            Transforming <span>Businesses</span>
          </h1>
          <p>
            We at Accio Finance provide expert assistance in maintaining
            <br />
            error-free & spotless ledgers for your business.
          </p>
        </div>
        <div className={styles.boxwrap}>
          <div className={styles.box}>
            <div className={styles.icon}>
              <img className={styles.convert} src="/b1.png" />
            </div>
            <div className={styles.content}>
              <h4>Account Reconciliation Services</h4>

              <ul>
                <li>
                  <img src="/li.png" />
                  <span>Bank Reconciliation Services</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Balance Sheet Reconciliation Services</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Accounts Payable Reconciliation Services</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Accounts Receivable Reconciliation Services</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Support for Discrepancy and adjustment entries.</span>
                </li>
              </ul>
              <div className={styles.buttonwrap}>
                <button type="button">View details</button>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.icon}>
              <img src="/b2.png" />
            </div>
            <div className={styles.content}>
              <h4>Bookkeeping & Accounting Services</h4>
              <ul>
                <li>
                  <img src="/li.png" />
                  <span>Daily Transaction Recording</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Accounts Payable & Receivable Management</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Petty Cash Management</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Expense Tracking and Categorization</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Year-End Closing</span>
                </li>
              </ul>
              <div className={styles.buttonwrap}>
                <button type="button">View details</button>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.icon}>
              <img src="/b3.png" />
            </div>
            <div className={styles.content}>
              <h4>Virtual CFO Services</h4>
              <ul>
                <li>
                  <img src="/li.png" />
                  <span>Tax & Compliance Strategy</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Budgeting and Forecasting</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Financial Planning and Analysis</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Cash Flow Management</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Financial Reporting and Analysis</span>
                </li>
              </ul>
              <div className={styles.buttonwrap}>
                <button type="button">View details</button>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.icon}>
              <img src="/b4.png" />
            </div>
            <div className={styles.content}>
              <h4>Employee & Payroll Management Services</h4>
              <ul>
                <li>
                  <img src="/li.png" />
                  <span>Onboarding and Employee Documentation</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Payroll Administration</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Time and Attendance Tracking</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Employees Tax and Compliance Reporting</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Employee Offboarding</span>
                </li>
              </ul>
              <div className={styles.buttonwrap}>
                <button type="button">View details</button>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.icon}>
              <img src="/b5.png" />
            </div>
            <div className={styles.content}>
              <h4>Tax Compliance for businesses</h4>
              <ul>
                <li>
                  <img src="/li.png" />
                  <span>Tax Preparation and Filing</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>IRS and State Audit Support</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Compliance Management</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Regulatory Updates and Advisory</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Risk Management and Audit Support</span>
                </li>
              </ul>
              <div className={styles.buttonwrap}>
                <button type="button">View details</button>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.icon}>
              <img src="/b6.png" />
            </div>
            <div className={styles.content}>
              <h4>Virtual Assistant Services</h4>
              <ul>
                <li>
                  <img src="/li.png" />
                  <span>Administrative Support</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Customer Support and Relationship Management</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Vendor Support and Relationship Management</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Invoice Processing</span>
                </li>
                <li>
                  <img src="/li.png" />
                  <span>Year-End Closing</span>
                </li>
              </ul>
              <div className={styles.buttonwrap}>
                <button type="button">View details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Business;
