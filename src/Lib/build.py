import os

tabSize = 3

pathPy = os.path.abspath(__file__).replace("\\", "/")
print("pathPy:", pathPy)

def GetInclude(textLine: str, oldTabs: int) -> str:
   index = textLine.find("{% include")
   if index != -1:
      indexStart = index + len("{% include") + 1
      indexEnd = textLine.find("%}", indexStart)
      pathInclude = textLine[indexStart:indexEnd].strip().replace("\"", "").replace("'", "")
      pathInclude = pathPy.replace("/Lib/build.py", f"/{pathInclude}")
      # print("pathInclude:", pathInclude)
      with open(pathInclude, "r", encoding="utf-8") as file:
         content = ""
         for line in file.readlines():
            content += (oldTabs * "\t") + line
         return content
   return None

def SetDistWithSrc(pathOrigin, pathDestino):
   newFile = ""

   with open(pathOrigin, "r", encoding="utf-8") as file:
      for line in file.readlines():
         textLine = line.strip()
         include = GetInclude(textLine, line.count(" " * tabSize) + line.count("\t"))
         if include: # se tiver include
            newFile += include
            continue
            
         indexComent = -1
         if (pathOrigin.endswith(".html")): indexComent = textLine.find("<!--")
         elif (pathOrigin.endswith(".css")): indexComent = textLine.find("/*")
         elif (pathOrigin.endswith(".js")): indexComent = textLine.find("//")
         else: print("Tipo de arquivo não configurado para remover comentários automaticamente.")
         if indexComent == 0: # comentario no inicio da linha
            continue
         if indexComent != -1: # comentario no meio/final da linha
            newFile += line[:indexComent] + "\n"
            continue
         else:
            newFile += line

   with open(pathDestino, "w", encoding="utf-8") as file:
      file.write(newFile)


pathSrcIndexHTML = pathPy.replace("/Lib/build.py", "/index.html")
pathDistIndexHTML = pathPy.replace("/src/Lib/build.py", "/dist/index.html")
print("pathSrcIndexHTML:", pathSrcIndexHTML)
print("pathDistIndexHTML:", pathDistIndexHTML)

pathSrcIndexCSS = pathPy.replace("/Lib/build.py", "/index.css")
pathDistIndexCSS = pathPy.replace("/src/Lib/build.py", "/dist/index.css")
print("pathSrcIndexCSS:", pathSrcIndexCSS)
print("pathDistIndexCSS:", pathDistIndexCSS)

SetDistWithSrc(pathSrcIndexHTML, pathDistIndexHTML)
SetDistWithSrc(pathSrcIndexCSS, pathDistIndexCSS)