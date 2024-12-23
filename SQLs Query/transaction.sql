CREATE TABLE transaction_logs (
    id SERIAL PRIMARY KEY,
    machine_no VARCHAR,
    -- Machine No
    operation_no VARCHAR,
    -- OP No
    line VARCHAR,
    -- Line
    activity VARCHAR,
    -- ประเภทตอนที่ตรวจเจอปัญหา
    tag_type VARCHAR,
    -- ประเภท Tag
    ctag_Level VARCHAR,
    -- Tag Level
    problem_type VARCHAR,
    -- ประเภทปัญหา
    komarigoto VARCHAR,
    -- โคมาริโกโต
    problem_topic VARCHAR,
    -- หัวข้อปัญหา
    counter_measure VARCHAR,
    -- แนวทางการแก้ไขปัญหา
    shift VARCHAR,
    -- กะทำงาน
    group_pic VARCHAR,
    -- ประเภทผู้รับผิดชอบ
    editor_pic VARCHAR,
    -- ผู้แก้ไขปัญหา
    receive_date DATE,
    -- วันที่กดส่งงาน
    start_date DATE,
    -- วันที่แจ้งปัญหา
    finish_date DATE,
    -- วันที่แก้ไขปัญหาเสร็จ
    end_date DATE,
    -- วันที่กำหนดส่ง
    gl_mt2 VARCHAR,
    -- รูป M/T 2
    gl_prod2 VARCHAR,
    -- รูป Prod 2
    attachment VARCHAR,
    -- รูปที่แนบมา
    test VARCHAR,
    -- Test
    cal_status VARCHAR,
    -- Cal Status
    date_mysign DATE,
    -- วันที่ M/T เซ็น
    date_prosign DATE,
    -- วันที่ Pro เซ็น
    created_by VARCHAR,
    -- ผู้แจ้งปัญหา
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- เวลาที่ลงข้อมูล
);

INSERT INTO
    transaction_logs (
        machine_no,
        operation_no,
        line,
        activity,
        tag_type,
        ctag_level,
        problem_type,
        komarigoto,
        problem_topic,
        counter_measure,
        shift,
        group_pic,
        editor_pic,
        receive_date,
        start_date,
        finish_date,
        end_date,
        gl_mt2,
        gl_prod2,
        attachment,
        test,
        cal_status,
        date_mtsign,
        date_prosign,
        created_by
    )
VALUES
    (
        'STAT_0038', 'OP520', 'Block D3', 'Daily Check', 'RED', 'C', 'Fault item', NULL, 'ปุ๋มกด  MASTER ON ไฟแจ้งสถานะขณะทำงานไม่ติด',
        'ทำการเปลี่ยนปุ๋มกด MASTER ON ใหม่', 'Y', 'M/T', NULL, '2024-05-19', '2024-05-19', '2024-05-25', '2024-05-25', 'test_image_mt2.png',
        'test_image_prod2.png', 'test_attachment.png', 'OFF', '1', '2024-05-25', '2024-05-25', 'พานเพชร คูณทวี'
    );