#/usr/local/bin/python3
import mutagen
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, TIT2, TPE1, TALB, TDRC, TYER
# audio = mutagen.File(r"../localdata/再见深海.mp3")
audio = mutagen.File(r"../localdata/稻香.mp3")
# audio = mutagen.File(r"../localdata/青花瓷.mp3")
# audio = mutagen.File(r"../localdata/信仰.mp3")

# audio.tags.add(TDRC(encoding=0, text=['2023.01.22']))
# audio.save()
# 这个可以答应出字段的原始编码
print(audio.values())
# print(audio.tags.pprint())
# print(audio.pprint().split('\n'))
# audio.save()