# Spring Security

Framework that focuses on providing both authentication and authorization to Java applications.
  
Official site [spring-security](https://spring.io/projects/spring-security){target="_blank"} 

# References

- Youtube
  - [Spring Office Hours: S3E17 - Spring Security Architecture Principals](https://www.youtube.com/live/GdgzXLAbnn8?si=wo2Hidhq2pwWYh4Z){target="_blank"}

# Pretext

- Servlet Applications : 
  - Servlets are Java classes that extend the capabilities of web servers by handling client requests and generating dynamic content.
  - They can read HTTP headers, write HTML responses, process user input, and interact with databases or other backend systems. 
  - Servlets are typically deployed as part of a web application, often packaged in a WAR (Web Application Archive) file. 
- Web Applications : 
  - Broader concept encompassing all the components needed to deliver a web-based service to users. 
  - They include servlets, JSPs (JavaServer Pages), HTML, CSS, JavaScript, images, and other resources that work together to deliver a specific functionality.

**Why Spring Security?**
- Securing endpoints
- Need to interact with http traffic

# Introduction
- In spring MVC, we interact with Http traffic using an interface called servlet filter (jakarta package).
- It has one method taking params - Request object, Response object and FilterChain
  - This reads the request, make security decision and write to response.
  - Like add context, block response OR do nothing and delegate to other filters in the filter chain and eventually request reaches the controller method.
  - This is the Core of onteracting with Http, the entry point for all the things.
- At low level, you need to understand 
  - where is the security stuff in the Http request.
  - How to parse a MTLS or TLS certificate
- `Authentication` interface in spring security represents the logged-in entity OR entity making the request to application.
- Entity can be
  - logged-in user
  - session cookie
  - automated robot account
  - token
- Spring security has a way in the filters that takes the low level details (implementation details) and transforms it into an authentication object representing the Authentication request.
- Spring security has an Authentication Manager which has list of Authentication Providers.
- As a user, you implement authentication provideers that take authentication request and turn them to successful Authentications.
- Common usecase - Form login when you start with spring security
- As a user, we need to know how to validate the Auth request into something that works.

# Principal vs UserDetails
- `Authentication` extends Principal (java security package)
- Never ever touch the low level Java Principal, better to work with Authentication.
- Authentication
  - getPrincipal identifies WHO?
  - getGrantedAuthorities identifies if Authorized?
- Example of Principal
  - For username/password login - Principal is loaded as UserDetails from DB.
  - OAuth login - Principal will be OAuth User
- UserDetails is one of the implementations used for Principal

# SecurityContext and SecurityContextHolder
- SecurityContext in spring security is the thread local per request object made and Authentication is put into it.
- Anywhere in our dependency tree, we can call `SecurityContextHolder.getContext().getAuthentication()` so you don't' have to pass it down.
- DEBUGGING TIP
  - You can check the log statement from Default security filter chain class `We'll secure such path ...` and see the list of filters loaded for the application.
  - If somthing explodes and you need to find where the bug is present in the security filter chain or where its stuck in securoty chain, Then to debug set the spring security log level to TRACE `logging.level.org.springframework.security=TRACE` and debug the last invoked filter in the logs
- spring.io does have good diagrams, example - [SecurityFilterChain](https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-securityfilterchain){target="_blank"} and [SecurityContextHolder](https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html#servlet-authentication-securitycontextholder){target="_blank"}
- Other Refs
  - ACL - Access Control List
  - Dynamic role access for menu management
  - LDAP
  - [Spring Security Architecture Principles - by Daniel Garnier-Moiroux - Broadcom](https://2024.springio.net/sessions/spring-security-architecture-principles/){target="_blank"} - presentation pdf [here](https://2024.springio.net/slides/spring-security-architecture-principles-springio24.pdf){target="_blank"}
  - practice to be good at live coding : shift shift zoom

# Annotations
- `@PreAuthorize`
- `@PostAuthorize`

OAuth2 
- Components and dependency
  - Resource Server : `spring-security`
  - Client : `spring-security`
  - Authorization Server : `spring-authorization-server`
- Token Exchange Grant
  - token with read write
  - exchange to get token only with read

CORS and CSRF with spring security
- enable CORS in spring backend
- CSRF default on


