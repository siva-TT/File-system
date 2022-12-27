import 'dart:convert';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:path_provider/path_provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late String dirPath;

  @override
  void initState() {
    setInit();
    super.initState();
  }

  setInit() async {
    String dPath = (await getApplicationSupportDirectory()).path;
    setState(() {
      dirPath = dPath;
    });
  }

  Future<File> _downloadFile(
      {required String url, required String filename}) async {
    var httpClient = new HttpClient();
    var request = await httpClient.getUrl(Uri.parse(url));
    var response = await request.close();
    var bytes = await consolidateHttpClientResponseBytes(response);
    File file = new File('$dirPath/$filename');
    await file.writeAsBytes(bytes);
    print("downloaded $filename");
    return file;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              child: Text("download asset first"),
              onPressed: () async {
                await _downloadFile(
                    url:
                        "https://raw.githubusercontent.com/siva-TT/west/main/index.html",
                    filename: "index.html");
                await _downloadFile(
                    url:
                        "https://raw.githubusercontent.com/siva-TT/west/main/css.css",
                    filename: "css.css");
                await _downloadFile(
                    url:
                        "https://raw.githubusercontent.com/siva-TT/west/main/js.js",
                    filename: "js.js");
                const snackBar = SnackBar(
                  content: Text('Assets downloaded! Open your WebView!'),
                  duration: Duration(seconds: 1),
                );
                ScaffoldMessenger.of(context).showSnackBar(snackBar);
              },
            ),
            SizedBox(
              height: 60,
            ),
            ElevatedButton(
              child: Text("Load Webview Html"),
              onPressed: () {
                Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) => HtmlPage(dirPath)));
              },
            ),
            ElevatedButton(
              child: Text("Load Webview Assets"),
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => AssetPage(dirPath)));
              },
            ),
          ],
        ),
      ),
    );
  }
}

// ignore: must_be_immutable
class HtmlPage extends StatefulWidget {
  String dirPath;
  HtmlPage(this.dirPath, {super.key});

  @override
  HtmlPageStete createState() => HtmlPageStete();
}

class HtmlPageStete extends State<HtmlPage> {
  late File pageHtmlFile;

  @override
  void initState() {
    String pageHtmlData = """
   <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My test page</title>
    <link href="css.css" rel="stylesheet" type="text/css">
    
  </head>
  <body>
    <h1>Mozilla is cool</h1>
    <img src="firefox-icon.png" alt="The Firefox logo: a flaming fox surrounding the Earth.">

    <p>Webview Local assets - At Mozilla, we’re a global community off</p>

    <ul> <!-- changed to list in the tutorial -->
      <li>technologists</li>
      <li>thinkers</li>
      <li>builders</li>
    </ul>

    <p>working together to keep the Internet alive and accessible, so people worldwide can be informed contributors and creators of the Web. We believe this act of human collaboration across an open platform is essential to individual growth and our collective future.</p>

    <p>Read the <a href="https://www.mozilla.org/en-US/about/manifesto/">Mozilla Manifesto</a> to learn even more about the values and principles that guide the pursuit of our mission.</p>
  <button>Change user</button>
  <script src="js.js"></script>
  </body>
</html>  """;

    pageHtmlFile = File('${widget.dirPath}/index.html');
    pageHtmlFile.writeAsBytesSync(utf8.encode(pageHtmlData));

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        title: const Text("Webview"),
      ),
      body: InAppWebView(
        initialUrlRequest:
            URLRequest(url: Uri.parse('file://${pageHtmlFile.path}')),
        initialOptions: InAppWebViewGroupOptions(
          crossPlatform: InAppWebViewOptions(
            minimumFontSize: 25,
            cacheEnabled: false,
            javaScriptEnabled: true,
            transparentBackground: true,
            verticalScrollBarEnabled: true,
            allowFileAccessFromFileURLs: true,
            allowUniversalAccessFromFileURLs: true,
            clearCache: true,
          ),
          android: AndroidInAppWebViewOptions(useHybridComposition: true),
          ios: IOSInAppWebViewOptions(
            allowingReadAccessTo:
                Uri.parse("file://${widget.dirPath}/"),
          ),
        ),
        onWebViewCreated: (webViewController) {
          webViewController.addJavaScriptHandler(
              handlerName: "getPostMessage", callback: (args) {});
        },
      ),
    );
  }
}

class AssetPage extends StatefulWidget {
  String dirPath;
  AssetPage(this.dirPath);

  @override
  AssetPageStete createState() => AssetPageStete();
}

class AssetPageStete extends State<AssetPage> {
  late File pageHtmlFile;

  @override
  void initState() {
    pageHtmlFile = File('${widget.dirPath}/index.html');
    print(pageHtmlFile);

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        title: const Text("Webview"),
      ),
      body: InAppWebView(
        initialUrlRequest:
            URLRequest(url: Uri.parse('file://${pageHtmlFile.path}')),
        initialOptions: InAppWebViewGroupOptions(
          crossPlatform: InAppWebViewOptions(
            minimumFontSize: 25,
            cacheEnabled: false,
            javaScriptEnabled: true,
            transparentBackground: true,
            verticalScrollBarEnabled: true,
            allowFileAccessFromFileURLs: true,
            allowUniversalAccessFromFileURLs: true,
            clearCache: true,
          ),
          android: AndroidInAppWebViewOptions(useHybridComposition: true),
          ios: IOSInAppWebViewOptions(
            allowingReadAccessTo: Uri.parse("file://${widget.dirPath}/"),
          ),
        ),
        onWebViewCreated: (webViewController) {
          webViewController.addJavaScriptHandler(
              handlerName: "getPostMessage", callback: (args) {});
        },
      ),
    );
  }
}
