import os;
import shutil;
from PIL import Image;
from enum import Enum;
import math;

pathPy = os.path.abspath(__file__).replace("\\", "/")
pathSrc = pathPy.replace("Lib/assets.py", "")
pathDist = pathPy.replace("src/Lib/assets.py", "dist/")

print("pathPy", pathPy)
print("pathSrc", pathSrc)
print("pathDist", pathDist)

class ExtractModeEnum(Enum):
    CRAFTPIX_NORMAL = 1


def CreateAtlasWithFolderOfAssets(pathOrigin, pathDestiny): # Use Gangsters_1 for Create AtlasOfAssets
    if os.path.exists(pathDestiny) == False:
        os.makedirs(pathDestiny)
    animations = 0

    # varrer os assets e procurar o tamanho maior de width e height, alem de ver a quantidade de animations
    atlasFiles = []
    biggestSize = 0
    imgs = []

    for root, dirs, files in os.walk(pathOrigin):
        filesAccepts = []
        
        for file in files:
            if file.endswith(".png"):
                img = Image.open(os.path.join(root, file))
                width, height = img.size
                animCount = width / height
                if animCount % 1 != 0:
                    print("Error: Animation is not correct format:", file)
                    print("width / height: ", width / height)
                    continue
                else:
                    animations += int(animCount)
                    for anim in range(int(animCount)):
                        imgs.append(img.crop((anim * height, 0, (anim + 1) * height, height)))

                if height > biggestSize:
                    biggestSize = height
                filesAccepts.append(file)
            else:
                print("File not supported:", file)

        atlasFiles.extend(filesAccepts)

    print("biggestSize", biggestSize)
    print("animations", animations)
    print("atlasFiles", atlasFiles)

    raiz = animations ** 0.5
    rest = raiz % 1
    X = int(raiz)
    Y = int(raiz)
    if rest != 0:
        X += 1
        if (X * (X - 1)) >= animations: Y = X - 1
        else: Y = X

    print("X", X, "Y", Y)

    atlas = Image.new("RGBA", (X * biggestSize, Y * biggestSize), (0, 0, 0, 0)) # Cria uma imagem em branco para o atlas

    position = (0, 0)
    x = 0
    y = 0

    for img in imgs:
        width, height = img.size
        atlas.paste(img, position)
        if x < X - 1:
            x += 1
            position = (x * biggestSize, y * biggestSize)
        else:
            x = 0
            y += 1
            position = (0, y * biggestSize)
        
    pathAtlasDestiny = os.path.join(pathDestiny, "atlas.png")
    print("pathAtlasDestiny", pathAtlasDestiny)
    atlas.save(pathAtlasDestiny)

def extractAssetsCraftpixNormal(pathOrigin, pathDestiny): # Use briga de rua_gangster for create multiple atlas
    execptionsFolders = ["PSD", "__MACOSX"]
    for item in os.listdir(pathOrigin): #  Use briga de rua_gangster For Gangsters_1
        if os.path.isdir(os.path.join(pathOrigin, item)):
            if item not in execptionsFolders:
                CreateAtlasWithFolderOfAssets(os.path.join(pathOrigin, item), os.path.join(pathDestiny, item))

def extractAssets(pathOrigin, pathDestiny, mode: ExtractModeEnum):
    if os.path.exists(pathDestiny) == False:
        os.makedirs(pathDestiny)
    
    if mode == ExtractModeEnum.CRAFTPIX_NORMAL:
        extractAssetsCraftpixNormal(pathOrigin, pathDestiny)

def extractMultAssets(pathOrigin, pathDestiny, mode: ExtractModeEnum):
    # extractAssets(os.path.join(pathSrcSprites, "briga de rua_gangster"), os.path.join(pathDistSprites, "briga de rua_gangster"), ExtractModeEnum.CRAFTPIX_NORMAL)
    for item in os.listdir(pathOrigin):
        if os.path.isdir(os.path.join(pathOrigin, item)):
            extractAssets(os.path.join(pathOrigin, item), os.path.join(pathDestiny, item), mode)

pathSrcSprites = os.path.join(pathSrc, "Assets/Sprites")
pathDistSprites = os.path.join(pathDist, "Assets/Sprites")
print("pathSrcSprites", pathSrcSprites)
print("pathDistSprites", pathDistSprites)


extractMultAssets(pathSrcSprites, pathDistSprites, ExtractModeEnum.CRAFTPIX_NORMAL)

