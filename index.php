<head>
  <link href="style.css" rel="stylesheet">
</head>
<body>
  <?php
    $script = $_GET["script"];
    if ($script){
  ?>
    <canvas id="game" width="640" height="480" style="background:black"></canvas>
    <script src="js/BulletBox.js"></script>
    <script src="js/Bullet.js"></script>
    <script src="js/SOUL.js"></script>
    <script src="js/Engine.js"></script>
    <script src="js/Utils.js"></script>
  <?php
      echo "<script src='$script/main.js'></script>";
    } else {
      echo "<form><select autofocus name='script'>";
      foreach (new DirectoryIterator('.') as $fileInfo) {
        if($fileInfo->isDot()) continue;
        if(!$fileInfo->isDir()) continue;
        $path = $fileInfo->getPathname();
        $name = $fileInfo->getFilename();
        if(!file_exists("$path/main.js")) continue;
        echo "<option value='$name'>$name</option>";
      }
      echo "</select><input type='submit'/></form>";
    }
  ?>


</body>
