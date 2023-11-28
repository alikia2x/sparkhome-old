import logging, base64, json
from urllib.parse import urlparse, unquote, parse_qs


def parse_payload(text):
    try:
        decoded_data = base64.b64decode(text).decode('utf-8')
        parsed_json = json.loads(decoded_data)
        return parsed_json
    except json.JSONDecodeError as json_error:
        logging.error(json_error)
        return None
    except Exception as e:
        logging.error(e)
        return None


def parse(url):
    decoded_url = unquote(url)
    parsed_url = urlparse(decoded_url)
    scheme = parsed_url.scheme
    query_params = parse_qs(parsed_url.query)
    payload = None
    if 'payload' in query_params:
        payload = parse_payload(query_params['payload'][0])
    loc = parsed_url.netloc
    path = parsed_url.path
    return {'scheme': scheme, 'payload': payload, 'loc': loc, 'path': path}