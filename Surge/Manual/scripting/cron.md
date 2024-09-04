
Evaluates script at specified times. The value should be a cron expression, which is a string consisting of five or six subexpressions (fields) that describe individual details of the schedule. 

Some cron expression examples:
* at 2am daily: 0 2 * * * 
* at 5 AM and 5 PM daily: 0 5,17 * * *
* on every minutes: * * * * *
* on every seconds: * * * * * *
* on every Sunday at 5 PM: 0 17 * * sun
* every 10 minutes: */10 * * * *

Just one incoming parameter: $cronexp.

Please invoke $done() to complete.

A simple example:

```
// cron "0 2 * * *" script-path=cron.js
$surge.setSelectGroupPolicy('Group', 'Proxy');
$done();
```

### Additional API

- `$cronexp`: The cron expression string.
