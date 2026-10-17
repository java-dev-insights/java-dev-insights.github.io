# Security: XSS Vulnerability Remediation (Reflected XSS & JSONP)

<-- [Back](./..)  
::: info About
**Security: XSS Vulnerability Remediation (Reflected XSS & JSONP)**   
Amazon LP: <Badge type="warning" text="Insist on the Highest Standards" /> <Badge type="tip" text="Earn Trust" />  
**Ticket:** TICKET-11309, TICKET-13621, TICKET-13666
:::

## Situation

A security researcher reported a Reflected XSS vulnerability on `https://rest.nexmo.com/` via an unsanitised `callback` parameter in the JSONP endpoint. The PoC demonstrated that visiting a crafted URL could execute arbitrary JavaScript in the victim's browser. A separate XSS-to-ATO (Account Takeover) vulnerability was also identified via a password manager on the same domain.

## Task

I was responsible for remediating the JSONP callback validation vulnerability and the XSS-to-ATO issue, ensuring the endpoints were hardened against injection attacks.

## Action

For the JSONP endpoint (TICKET-13666), I implemented strict alphanumeric validation on the `callback` parameter, rejecting any value containing HTML/JavaScript characters. For the XSS-to-ATO issue (TICKET-13621), I implemented Content Security Policy (CSP) headers and input sanitisation on the affected password manager integration point. I tested the fixes against the original PoC payloads to confirm remediation.

## Result

Both vulnerabilities were remediated and verified. The security findings were closed in the VRR. The JSONP endpoint now rejects malformed callback parameters with a 400 error, preventing the XSS attack vector.

## Learning

Security vulnerabilities in public-facing APIs require both input validation and output encoding — fixing one without the other leaves the door open. I also learned the value of testing fixes against the original PoC, not just unit tests.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The JSONP PoC URL was: `https://rest.nexmo.com/pricing/NO/jsonp?callback=<img src=x onerror=alert(document.domain)>aaaaa`
* The fix validated the `callback` parameter against a regex `^[a-zA-Z0-9_\.]+$` before including it in the response.
* The XSS-to-ATO (TICKET-13621) was a more complex attack chain involving a password manager autofill that could be triggered by a malicious page.
* Both fixes were deployed to production and the VRR findings were formally closed.
