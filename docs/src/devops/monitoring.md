---
outline: [2,3]
---

# Monitoring

## Prometheus

[Prometheus](https://prometheus.io/docs/introduction/overview/){target="_blank"} is used to collect metrics from your applications and infrastructure. These metrics can be used to track the health of your systems, identify potential problems, and troubleshoot issues.

- [PromQL Cheat Sheet](https://promlabs.com/promql-cheat-sheet/){:trget="_blank"}
- [The 4 Types Of Prometheus Metrics](https://tomgregory.com/the-four-types-of-prometheus-metrics){:trget="_blank"}

## Spring Boot Default Metrics

Actuator module provides monitoring and management capabilities for your application, and includes the Micrometer metrics collection facility.  
It exposes many different monitoring and management endpoints over HTTP and JMX.

> NOTE: Micrometer is a vendor-neutral metrics facade, meaning that metrics can be collected in one common way, but exposed in the format required by many different monitoring systems.  
> Popular monitoring frameworks supported include Graphite, Prometheus, and StatsD.

![](https://tomgregory.com/article-assets/spring-boot-default-metrics/Prometheus-overview-1.png)

```groovy
// build.gradle
implementation 'org.springframework.boot:spring-boot-starter-actuator'
implementation 'io.micrometer:micrometer-registry-prometheus:1.5.1'
// application.properties
management.endpoints.web.exposure.include=metrics,prometheus
```

This configuration enables two endpoints:
- `/actuator/metrics` : provides a JSON API for navigating your metrics and viewing their values
- `/actuator/prometheus` : metrics in the custom format required for ingesting into Prometheus.

### Spring MVC metrics

#### Inbound HTTP request duration

- `http_server_requests_seconds_count` is the total number of requests your application received at this endpoint
- `http_server_requests_seconds_sum` is the sum of the duration of every request your application received at this endpoint

```t
# TYPE http_server_requests_seconds summary
http_server_requests_seconds_count{exception="None",method="GET",outcome="SUCCESS",status="200",uri="/doit",} 20.0
http_server_requests_seconds_sum{exception="None",method="GET",outcome="SUCCESS",status="200",uri="/doit",} 0.132131598
```

average inbound request duration across all tags: `rate( http_server_requests_seconds_sum[1m]) / rate(http_server_requests_seconds_count[1m])`
Why use rate?  
Representing a counter without rate normalization over some time window is rarely useful, as the representation is a function of both the rapidity with which the counter is incremented and the longevity of the service.

#### Inbound HTTP request quantiles & percentiles

useful when you want to assess how slow is the request duration of an API while ignoring the very slowest requests.  
95th percentile : value at which 95% of the observed values are below, and 5% are above. In other words, it gives you the slowest request duration that 95% of requests are seeing.

```
management.metrics.web.server.request.autotime.percentiles=<comma-separated list of quantiles>

http_server_requests_seconds{exception="None",method="GET",outcome="SUCCESS",status="200",uri="/doit",quantile="0.95",} 0.023068672
```

#### Inbound HTTP request maximum duration

`http_server_requests_seconds_max` is the maximum request duration during a time window. The value resets to 0 when a new time window starts. The default time window is 2 minutes.

```
# HELP http_server_requests_seconds_max
# TYPE http_server_requests_seconds_max gauge
http_server_requests_seconds_max{exception="None",method="GET",outcome="SUCCESS",status="200",uri="/doit",} 0.014306
```

### HTTP Client RestTemplate & WebClient outbound request metrics

#### HTTP Client RestTemplate & WebClient outbound request metrics

- `http_client_requests_seconds_count` is the total number of requests your application made to this endpoint
- `http_client_requests_seconds_sum` is the sum of the duration of every request your application made to this endpoint
- average outbound request duration over time: `rate(http_client_requests_seconds_sum[1m]) / rate(http_client_requests_seconds_count[1m])`

```
# HELP http_client_requests_seconds Timer of RestTemplate operation
# TYPE http_client_requests_seconds summary
http_client_requests_seconds_count{clientName="google.com",method="GET",outcome="SUCCESS",status="200",uri="/https://google.com",} 3.0
http_client_requests_seconds_sum{clientName="google.com",method="GET",outcome="SUCCESS",status="200",uri="/https://google.com",} 0.465022459
```

#### Outbound HTTP request maximum duration

`http_client_requests_seconds_max` is the maximum request duration during a time window. The value resets to 0 when a new time window starts. The default time window is 2 minutes.

```
# HELP http_client_requests_seconds_max Timer of RestTemplate operation
# TYPE http_client_requests_seconds_max gauge
http_client_requests_seconds_max{clientName="google.com",method="GET",outcome="SUCCESS",status="200",uri="/https://google.com",} 0.205564498
```

### JVM metrics

#### JVM memory metrics

total amount of used heap type memory : `sum(jvm_memory_used_bytes{area="heap"})`

```
# HELP jvm_memory_used_bytes The amount of used memory
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes{area="nonheap",id="CodeHeap 'profiled nmethods'",} 8231168.0
jvm_memory_used_bytes{area="heap",id="G1 Survivor Space",} 5242880.0
jvm_memory_used_bytes{area="heap",id="G1 Old Gen",} 1.164288E7
jvm_memory_used_bytes{area="nonheap",id="Metaspace",} 4.180964E7
jvm_memory_used_bytes{area="nonheap",id="CodeHeap 'non-nmethods'",} 1233536.0
jvm_memory_used_bytes{area="heap",id="G1 Eden Space",} 1.2582912E7
jvm_memory_used_bytes{area="nonheap",id="Compressed Class Space",} 5207416.0
jvm_memory_used_bytes{area="nonheap",id="CodeHeap 'non-profiled nmethods'",} 1590528.0
```

```
# HELP jvm_memory_max_bytes The maximum amount of memory in bytes that can be used for memory management
# TYPE jvm_memory_max_bytes gauge
jvm_memory_max_bytes{area="nonheap",id="CodeHeap 'profiled nmethods'",} 1.22912768E8
jvm_memory_max_bytes{area="heap",id="G1 Survivor Space",} -1.0
jvm_memory_max_bytes{area="heap",id="G1 Old Gen",} 5.22190848E8
jvm_memory_max_bytes{area="nonheap",id="Metaspace",} -1.0
jvm_memory_max_bytes{area="nonheap",id="CodeHeap 'non-nmethods'",} 5828608.0
jvm_memory_max_bytes{area="heap",id="G1 Eden Space",} -1.0
jvm_memory_max_bytes{area="nonheap",id="Compressed Class Space",} 1.073741824E9
jvm_memory_max_bytes{area="nonheap",id="CodeHeap 'non-profiled nmethods'",} 1.22916864E8
```

#### JVM garbage collection metrics

Pause duration

```
# HELP jvm_gc_pause_seconds Time spent in GC pause
# TYPE jvm_gc_pause_seconds summary
jvm_gc_pause_seconds_count{action="end of minor GC",cause="Metadata GC Threshold",} 1.0
jvm_gc_pause_seconds_sum{action="end of minor GC",cause="Metadata GC Threshold",} 0.005
jvm_gc_pause_seconds_count{action="end of minor GC",cause="G1 Evacuation Pause",} 9.0
jvm_gc_pause_seconds_sum{action="end of minor GC",cause="G1 Evacuation Pause",} 0.074

# HELP jvm_gc_pause_seconds_max Time spent in GC pause
# TYPE jvm_gc_pause_seconds_max gauge
jvm_gc_pause_seconds_max{action="end of minor GC",cause="Metadata GC Threshold",} 0.0
jvm_gc_pause_seconds_max{action="end of minor GC",cause="G1 Evacuation Pause",} 0.004
```

Memory pool size increase

```
# HELP jvm_gc_memory_allocated_bytes_total Incremented for an increase in the size of the young generation memory pool after one GC to before the next
# TYPE jvm_gc_memory_allocated_bytes_total counter
jvm_gc_memory_allocated_bytes_total 2.66338304E8

# HELP jvm_gc_memory_promoted_bytes_total Count of positive increases in the size of the old generation memory pool before GC to after GC
# TYPE jvm_gc_memory_promoted_bytes_total counter
jvm_gc_memory_promoted_bytes_total 1.4841448E7
```

Live old generation pool size

```
# HELP jvm_gc_live_data_size_bytes Size of old generation memory pool after a full GC
# TYPE jvm_gc_live_data_size_bytes gauge
jvm_gc_live_data_size_bytes 9039328.0

# HELP jvm_gc_max_data_size_bytes Max size of old generation memory pool
# TYPE jvm_gc_max_data_size_bytes gauge
jvm_gc_max_data_size_bytes 5.22190848E8
```

JVM thread metrics
- jvm_threads_states_threads shows how many threads are in each thread state
- jvm_threads_live_threads shows the total number of live threads, including daemon and non-daemon threads
- jvm_threads_daemon_threads shows the total number of daemon threads
- jvm_threads_peak_threads shows the peak total number of threads since the JVM started

Daemon threads Daemon threads are low priority threads that perform background tasks such as garbage collection

```
# HELP jvm_threads_states_threads The current number of threads having NEW state
# TYPE jvm_threads_states_threads gauge
jvm_threads_states_threads{state="runnable",} 7.0
jvm_threads_states_threads{state="blocked",} 0.0
jvm_threads_states_threads{state="waiting",} 11.0
jvm_threads_states_threads{state="timed-waiting",} 3.0
jvm_threads_states_threads{state="new",} 0.0
jvm_threads_states_threads{state="terminated",} 0.0

# HELP jvm_threads_live_threads The current number of live threads including both daemon and non-daemon threads
# TYPE jvm_threads_live_threads gauge
jvm_threads_live_threads 21.0

# HELP jvm_threads_daemon_threads The current number of live daemon threads
# TYPE jvm_threads_daemon_threads gauge
jvm_threads_daemon_threads 17.0

# HELP jvm_threads_peak_threads The peak live thread count since the Java virtual machine started or peak was reset
# TYPE jvm_threads_peak_threads gauge
jvm_threads_peak_threads 23.0
```

## Micrometer

To have "dynamic" tag values, simply skip the instantiation of the counters in the initCounters() method. Everytime the counter shall be increased, instantiate a counter by using its builder method and increment, for example:
```java
Counter.builder("iso_response")
    .tags("mti", request.getMTI())
    .tags("response_code", myReponseCode)
    .register(meterRegistry)
    .increment();
```
In fact, as the `io.micrometer.core.instrument.Counter.Builder.register` method states in its JavaDoc, a new counter is returned only if a counter with the same tag values does not yet exist. This is because each registry is guaranteed to only create one counter for the same combination of name and tags.
