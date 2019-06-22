import matplotlib.pyplot as plt
from scipy.signal import find_peaks
import plotly.plotly as py
import plotly.graph_objs as go
from plotly.tools import FigureFactory as FF

import numpy as np
import pandas as pd
import scipy
import peakutils
x =[ 2.275090217590332,
2.38462495803833,
2.449866771697998,
2.4372973442077637,
1.8381483554840088,
1.1402385234832764,
1.7818846702575684,
2.076371431350708,
2.3720552921295166,
2.275090217590332,
2.38462495803833,
2.449866771697998,
2.4372973442077637,
1.8381483554840088,
1.1402385234832764,
1.7818846702575684,
2.076371431350708,
2.3720552921295166]
import matplotlib.pyplot as plt
from scipy.misc import electrocardiogram
from scipy.signal import find_peaks
# x = electrocardiogram()[2000:4000]
x = np.array(x)
peaks, _ = find_peaks(x, height=0)
plt.plot(x)
plt.plot(peaks, x[peaks], "x")
plt.plot(np.zeros_like(x), "--", color="gray")
plt.show()