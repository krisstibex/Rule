_Scripting requires Surge iOS 4 or Surge Mac 3.3.0_

# Scripting

You may use JavaScript to extend the ability of Surge as you wish.

## Script Section

```
[Script]
script1 = type=http-response,pattern=^http://www.example.com/test,script-path=test.js,max-size=16384,debug=true
scropt2 = type=cron,cronexp="* * * * *",script-path=fired.js
scropt3 = type=http-request,pattern=^http://httpbin.org,script-path=http-request.js,max-size=16384,debug=true,requires-body=true
scropt4 = type=dns,script-path=dns.js,debug=true
```

Each line has two components: script name and parameters. 
Common parameters: 
 
* `type`: The type of script: `http-request`, `http-response`, `cron`, `event`, `dns`, `rule`, `generic`.
* `script-path`: The path of the script, can be a relative path to the profile, an absolute path, or a URL.
* `script-update-interval`: The update interval while using an URL for script-path, in seconds. 
* `debug`: Enabling the debug mode, which has several effects:
   1. The script is loaded from the filesystem every time before evaluating it.
   2. For `http-request` and `http-response` scripts, when you use `console.log()` to log messages, the messages also appear in the request's notes.
* `timeout`: The longest-running time for the script. The default value is 10s.
* `argument`: The script may fetch the value with `$argument`.

Parameters for `http-request` and `http-response`:

* `pattern`: The regex pattern to match the URL.

* `requires-body`: This allows the script to modify the request/response body. The default value is false. This behavior is expensive. Only enable when necessary.

* `max-size`: The maximum allowed size for the request/response body. The default value is 131072 (128KB).

* `binary-body-mode`: Only available in iOS 15 and macOS. The raw binary body data will be passed to the script in Uint8Array instead of a string value.
* `ability`: Some script APIs must be predeclared.

Scripting requires Surge to load the entire response body data to memory. A huge response body may cause Surge iOS crash since the iOS system limits the maximum amount of memory the Network Extension can occupy.

Please only enable scripting for necessary URLs.

If the response body size exceeds `max-size` value, Surge fallbacks to passthrough mode and skips scripting for this request.

## Basic Constraints

Scripts allow asynchronous operations. $done(value<Object>) should be invoked to indicate completion, even for the scripts which don't require a result. Otherwise, the script gets a warning because of a timeout. 

## Performances

You don't need to worry about the performance of scripting. The JavaScript core is notably effective. 

## Public API

### Basic Information

* **`$network`**

The object contains the detail of the network environment.

* **`$script`**

  - `$script.name<String>`: The script name which is being evaluated.
  - `$script.startTime<Date>`: The time when the current script starts.
  - `$script.type<String>`: The type of the current script.

* **`$environment`**

  - `$environment.system<String>`: iOS or macOS.
  - `$environment.surge-build<String>`: The build number of Surge.
  - `$environment.surge-version<String>`: The short version number of Surge.
  - `$environment.language<String>`: The current UI language of Surge.

### Persistent Store

* **`$persistentStore.write(data<String>, [key<String>])`**

Save data permanently. Only a string is allowed. Return true if successes.

* **`$persistentStore.read([key<String>])`**

Get the saved data. Return a string or Null.

If the key is undefined, the script with the same script-path shares the storage pool. Data can be shared among different scripts when using a key.

Tips: Surge Mac writes the $persistentStore data to the directory `~/Library/Application Support/com.nssurge.surge-mac/SGJSVMPersistentStore/`. You may edit the files here directly for debugging.

### Control Surge

* **`$httpAPI(method<String>, path<String>, body<Object>, callback<Function>(result<Object>))`**

You may use $httpAPI to call all HTTP APIs to control Surge's functions. No authentication parameters are required. See the HTTP API section for the available abilities.


### Utilities


* **`console.log(message<String>)`**

Log to Surge logfile.

* **`setTimeout(function[, delay])`**

Same as the setTimeout in browsers.

* **`$httpClient.post(URL<String> or options<Object>, callback<Function>)`**

Start an HTTP POST request. The first parameter can be a URL or object. An example object may look like that. 

```
{
  url: "http://www.example.com/",
    headers: {
    Content-Type: "application/json"
    },
  body: "{}"
}
```

When using an object as an option list. `url` is required. If `headers` field exists, it overwrites all existing header fields. `body` can be a string or object. When presenting an object, it is encoded to JSON string, and the 'Content-Type' is set to `application/json`.

You may specify a policy to perform the request:
  - `policy`: Use an existing policy with its name.
  - `policy-descriptor`: Use a temporary policy with a full descriptor.

You must predeclare `ability=http-client-policy` to use this option.

callback: callback(error<String>, response<Object>, data<String>)

When successful, the error is null, and the response object contains `status` and `headers` properties.

Similar function: **$httpClient.get**, **$httpClient.put**，**$httpClient.delete**, **$httpClient.head**, **$httpClient.options**, **$httpClient.patch**.

The timeout of a request is 5 seconds.

* **`$notification.post(title<String>, subtitle<String>, body<String>)`**

Post a notification. 

* **`$utils.geoip(ip<String>)`**

Perform a GeoIP lookup. Results are in the ISO 3166 code.

* **`$utils.ipasn(ip<String>)`**

Lookup the ASN of the IP address.

* **`$utils.ipaso(ip<String>)`** 

Lookup the ASO of the IP address.

* **`$utils.ungzip(binary<Uint8Array>)`** 

Decompress gzip data. The result is also a Uint8Array.


### Manually Trigger

You can manually trigger a script on Surge iOS by long pressing on the script or using the system Shortcuts.app.

If you use Shortcuts to trigger a script, you may optionally pass a parameter to the script and use `$intent.parameter` to retrieve it.