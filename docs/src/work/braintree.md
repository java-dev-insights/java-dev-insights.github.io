# Braintree

Resources and tools for developers to integrate Braintree's global payments platform.

## Pretext
Yes, [PayPal](https://investors.ebayinc.com/investor-news/press-release-details/2013/EBay-Inc-Completes-Acquisition-of-Global-Payments-Innovator-Braintree/default.aspx){target="_blank"} acquired Braintree in September 2013 for approximately $800 million. The acquisition, made while PayPal was part of eBay Inc., was intended to help both companies innovate and grow in the mobile and online payments space. Braintree continues to operate as a separate service within PayPal and includes the popular mobile payment app, Venmo, which Braintree had acquired earlier. 

## Paypal
- Sandbox - [Search Transaction](https://sandbox.braintreegateway.com/merchants/9xr5z5yvsm6qdrzq/transactions/advanced_search){target="_blank"}
- Paypal - [user login](https://www.sandbox.paypal.com/myaccount/summary){target="_blank"}
- [Braintree Direct](https://developer.paypal.com/braintree/docs/start/overview/#braintree-direct){target="_blank"}
- [How it Works](https://developer.paypal.com/braintree/docs/start/overview/#how-it-works){target="_blank"} - Diagram
- [Setup Guide](https://developer.paypal.com/braintree/articles/guides/payment-methods/paypal/setup-guide){target="_blank"} - [Set Up Your Client](https://developer.paypal.com/braintree/docs/start/hello-client/javascript/v3/){target="_blank"} and [Set Up Your Server](https://developer.paypal.com/braintree/docs/start/hello-server/java/){target="_blank"}
- [Payment Flow](https://developer.paypal.com/braintree/docs/guides/paypal/overview/javascript/v3/){target="_blank"} - Vaulted Payments vs. One-Time Payments vs. Recurring Payments
- [Set Up Your Server](https://developer.paypal.com/braintree/docs/start/hello-server/java/){target="_blank"} - sale api call ([Transaction: Sale](https://developer.paypal.com/braintree/docs/reference/request/transaction/sale/java){target="_blank"}) returns a [Transaction Result Object](https://developer.paypal.com/braintree/docs/reference/response/transaction/java/#result-object){target="_blank"} (same response for [other actions of Transaction](https://developer.paypal.com/braintree/docs/reference/response/transaction/java/){target="_blank"})
- [Transaction Lifecycle](https://developer.paypal.com/braintree/articles/get-started/transaction-lifecycle){target="_blank"} - [Braintree Transaction](https://developer.paypal.com/braintree/docs/guides/transactions/java/){target="_blank"} has possible values for [status](https://developer.paypal.com/braintree/docs/reference/response/transaction/java/#status){target="_blank"}
- [Transaction: Refund](https://developer.paypal.com/braintree/docs/reference/request/transaction/refund/java){target="_blank"} - transactions that have a status of [settled](https://developer.paypal.com/braintree/docs/reference/general/statuses#settled){target="_blank"} or [settling](https://developer.paypal.com/braintree/docs/reference/general/statuses#settling){target="_blank"}, for others use [Transaction: Void](https://developer.paypal.com/braintree/docs/reference/request/transaction/void/java){target="_blank"} instead.
- [Voiding settlement](https://developer.paypal.com/braintree/docs/reference/response/transaction/java/#voiding-settlement){target="_blank"} - If you submit a transaction for settlement and then decide you actually don't want to settle it, you can [void](https://developer.paypal.com/braintree/docs/reference/request/transaction/void){target="_blank"} it before it's settled. After it's settled, you'll need to [refund](https://developer.paypal.com/braintree/docs/reference/request/transaction/refund){target="_blank"} it instead.
- [Transaction: Cancel Release](https://developer.paypal.com/braintree/docs/reference/request/transaction/cancel-release/java){target="_blank"} - This functionality is specific to [Braintree Marketplace](https://developer.paypal.com/braintree/docs/guides/braintree-marketplace/overview){target="_blank"} merchants.
    - This has a master-merchant and sub-merchant
- Payment Methods : [PayPal](https://developer.paypal.com/braintree/articles/guides/payment-methods/paypal/overview){target="_blank"} 
- Options
    - Submit for settlement and then refund on error
    - authorize and then either void OR Submit for settlement
- [Managing Authorizations](https://developer.paypal.com/braintree/articles/control-panel/transactions/managing-authorizations){target="_blank"} with [statuses of auth-expired](https://developer.paypal.com/braintree/docs/reference/general/statuses#authorization-expired){target="_blank"} - for businesses that wait to collect funds until they are ready to ship their products

```java
result.isSuccess();
// true

Transaction transaction = result.getTarget();
transaction.getStatus();
// Transaction.Status.AUTHORIZED

Transaction transaction = result.getTarget();
transaction.getPaymentInstrumentType().equals(PaymentInstrumentType.PAYPAL_ACCOUNT);
// false
transaction.getPaymentInstrumentType().equals(PaymentInstrumentType.CREDIT_CARD);
// true
```

STEPS
- Create Customer
- Create Instrument (save in vault on success)
- Sale without submit for settlement
- Perform your checks
- Submit transaction for settlement
