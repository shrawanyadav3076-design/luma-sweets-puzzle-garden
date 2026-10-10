package com.example

import android.annotation.SuppressLint
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.viewinterop.AndroidView

class MainActivity : ComponentActivity() {

  class AndroidNativeBridge(private val context: Context) {
    @JavascriptInterface
    fun vibrate(durationMs: Long) {
      try {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
          val vibratorManager =
              context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
          vibratorManager?.defaultVibrator?.vibrate(
              VibrationEffect.createOneShot(
                  durationMs.coerceIn(10, 500),
                  VibrationEffect.DEFAULT_AMPLITUDE
              )
          )
        } else {
          @Suppress("DEPRECATION")
          val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator?.vibrate(
                VibrationEffect.createOneShot(
                    durationMs.coerceIn(10, 500),
                    VibrationEffect.DEFAULT_AMPLITUDE
                )
            )
          } else {
            @Suppress("DEPRECATION")
            vibrator?.vibrate(durationMs.coerceIn(10, 500))
          }
        }
      } catch (_: Exception) {
      }
    }

    @JavascriptInterface
    fun showToast(message: String) {
      Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      Box(
          modifier =
              Modifier.fillMaxSize()
                  .background(Color(0xFF130924))
      ) {
        GameWebView(
            assetUrl = "file:///android_asset/www/index.html",
            bridge = remember { AndroidNativeBridge(this@MainActivity) }
        )
      }
    }
  }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun GameWebView(assetUrl: String, bridge: MainActivity.AndroidNativeBridge) {
  AndroidView(
      modifier = Modifier.fillMaxSize(),
      factory = { context ->
        WebView(context).apply {
          layoutParams = ViewGroup.LayoutParams(
              ViewGroup.LayoutParams.MATCH_PARENT,
              ViewGroup.LayoutParams.MATCH_PARENT
          )
          setBackgroundColor(0xFF130924.toInt())
          settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            mediaPlaybackRequiresUserGesture = false
            cacheMode = WebSettings.LOAD_DEFAULT
            useWideViewPort = true
            loadWithOverviewMode = true
            displayZoomControls = false
            builtInZoomControls = false
            setSupportZoom(false)
          }
          addJavascriptInterface(bridge, "AndroidBridge")
          webViewClient = object : WebViewClient() {}
          webChromeClient = object : WebChromeClient() {}
          loadUrl(assetUrl)
        }
      },
      update = { webView ->
        // Keeps state alive
      }
  )
}
