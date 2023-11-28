# Time Scheme

## Base URL

`time://target/path?payload=payload`

## Target

If target is empty, it will be auto set as `now`.

Available targets:

### now

Return time based on current server time.
By default, it returns a float value containing a timestamp.

**Example**:

URL: `time://now`  
Return Data: `1699724213.6873128`

## Payload

The payload is a base64 contains a JSON string to deliver extra data.

Available payload option:

### format

Format the timestamp to 