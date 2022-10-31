# jedyneczki
A website showing how much bad grades did I get, from the beginning of the year to now!

Made in Python, using [FastAPI](https://fastapi.tiangolo.com/) and [vulkan-api](https://github.com/kapi2289/vulcan-api).

## Running
Make sure you're running Python 3.7+ before doing any steps.

1. Clone the repository into a directory of your choice.
2. Move to the directory with the files in a terminal.
3. Log into the Vulcan e-register student/parent panel, and move to the "Mobile access/Dostęp mobilny" tab.
4. Click the "Generate access code/Wygeneruj kod dostępu" button to generate the values needed for logging in.
4. Run `python3 tools/create_account.py` and fill all of the values provided from the Vulcan website.
5. Create a new file called `uvicorn.json` & fill it according to the template below.
    - See [the Uvicorn page](https://www.uvicorn.org/#command-line-options) for more details about available options.

```json
{
    "host": "<YOUR_DESIRED_HOSTNAME_HERE>",
    "port": "<YOUR_DESIRED_PORT_HERE>"
}
```
6. Run `python3 -m pip install -r requirements.txt` to install required requirements.
7. Done! To run the website, do `python3 main.py`.

## Contributing
As with all my projects, contributions are highly appreciated!
