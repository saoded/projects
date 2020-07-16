import numpy as np
from datetime import datetime, timedelta
from pause import until
from random import randrange, choice, randint
from itertools import compress

PRE_DATA_LEN = 19
POST_DATA_LEN = 25


class metadata:
    def __init__(self, timestamp, length, databytes):
        self.timestamp = timestamp
        self.length = length
        self.databytes = databytes


TIMESTAMP_INIT = datetime(2000, 1, 1)
FRAME_META = {0x100: metadata(TIMESTAMP_INIT, 0, []),
              0x200: metadata(TIMESTAMP_INIT, 0, []),
              0x300: metadata(TIMESTAMP_INIT, 0, [])}
FRAME_IDS = list(FRAME_META.keys())


def sys_reset():
    global FRAME_META
    FRAME_META = {0x100: metadata(TIMESTAMP_INIT, 0, []),
                  0x200: metadata(TIMESTAMP_INIT, 0, []),
                  0x300: metadata(TIMESTAMP_INIT, 0, [])}


# GENERATOR UNIT
SOF = 1
MIN_GEN_DELTA = 50  # ms
MAX_GEN_DELTA = 100  # ms
last_gen_time = datetime.now()
POST_DATA = (1 << POST_DATA_LEN) - 1


def generate_can_frame():
    global last_gen_time
    frame_id = choice(FRAME_IDS)
    # GENERATE DATA FIELDS
    dlc = randint(0, 8)
    DATA_LEN = 8 * dlc
    data = randint(0, (1 << DATA_LEN) - 1)
    # CONSTRUCT FRAME
    frame = frame_constructor(frame_id, dlc, data)
    # GENERATE DUE TIME
    last_gen_time += timedelta(milliseconds=randrange(MIN_GEN_DELTA,
                                                      MAX_GEN_DELTA))
    # WAIT FOR DUE TIME
    until(last_gen_time)  # REQUIRES PYTHON 3
    # SEND FRAME
    return frame


def frame_constructor(id, dlc, data):
    frame = (1 << 11) + id
    frame = (frame << 3) + 0b111
    frame = (frame << 4) + dlc
    frame = (frame << (8 * dlc)) + data
    return (frame << POST_DATA_LEN) + POST_DATA


# DETECTOR UNIT
MAX_RATE = 100  # ms
MIN_FRAME_LEN = PRE_DATA_LEN + POST_DATA_LEN
# FRAME_GEN_TIMES = [TIMESTAMP_INIT, TIMESTAMP_INIT, TIMESTAMP_INIT]


class analysed_frame:
    def __init__(self, frame, timestamp, frame_id, validity):
        self.frame = frame
        self.timestamp = timestamp
        self.frame_id = frame_id
        self.validity = validity


def detect_can_frame(frame):
    timestamp = datetime.now()

    validity = 0b000

    # VALIDATE RATE
    frame_len = int(np.log2(float(frame))) + 1
    frame_id_shift = frame_len - 12
    frame_id = (frame >> frame_id_shift) % (1 << 11)
    # print(hex(frame_id))
    validity |= 0b001 * \
        (timestamp - FRAME_META[frame_id].timestamp <
         timedelta(milliseconds=MAX_RATE))
    FRAME_META[frame_id].timestamp = timestamp

    # VALIDATE LENGTH
    validity |= 0b010 * (FRAME_META[frame_id].length == frame_len)
    FRAME_META[frame_id].length = frame_len

    # VALIDATE DATA
    # dlc_shift = frame_len - PRE_DATA_LEN
    # dlc = (frame >> dlc_shift) % 16
    data_len = (frame_len - MIN_FRAME_LEN)  # Bits
    dlc = data_len >> 3  # Bytes
    data = (frame >> POST_DATA_LEN)
    dataValidity = False
    databytes = []
    for i in range(dlc):
        databytes.append(data % 256)
        dataValidity |= databytes[i] in FRAME_META[frame_id].databytes
        data >>= 8
    # print(databytes)
    validity |= 0b100 * dataValidity
    FRAME_META[frame_id].databytes = databytes

    return analysed_frame(frame, timestamp, frame_id, validity)


def get_frame_len(frame):
    length = MIN_FRAME_LEN
    while frame > (1 << length):
        length += 1
    return length


# REPORTER UNIT
FIELD_DELIMETER = ", "
INVALIDITY_MESSAGES = np.array(["EXCEEDING RATE",
                                "INVALID FRAME LENGTH", "REPEATED DATA"])


def report(af):
    print_str = str(af.timestamp) + FIELD_DELIMETER + \
                hex(af.frame) + FIELD_DELIMETER + \
                ("Invalid" if bool(af.validity) else "Valid") + FIELD_DELIMETER + \
                str(INVALIDITY_MESSAGES[selectors(af.validity)]) + "\n"
    return print_str


def selectors(validity):
    return [bool(validity & 1), bool(validity & 2), bool(validity & 4)]


if __name__ == "__main__":
    report(detect_can_frame(generate_can_frame()))
# print(FRAME_GEN_TIMES)
