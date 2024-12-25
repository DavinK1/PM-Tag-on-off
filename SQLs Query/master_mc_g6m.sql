CREATE TABLE master_mc_g6m (
    id SERIAL PRIMARY KEY,
    link_title VARCHAR(255) NOT NULL,
    line_name VARCHAR(255) NOT NULL
);

INSERT INTO
    master_mc_g6m (link_title, line_name)
VALUES
    ('G6-Block', 'STGR-0163'),
    ('G6-Block', 'STAT-0065'),
    ('G6-Block', 'STBR-0034'),
    ('G6-Block', 'STCK-0122'),
    ('G6-Block', 'STCK-0125'),
    ('G6-Block', 'STMM-0062'),
    ('G6-Block', 'STMM-0063'),
    ('G6-Block', 'STMM-0064'),
    ('G6-Block', 'STSP-0759'),
    ('G6-Block', 'STSP-0760'),
    ('G6-Block', 'STSP-0761'),
    ('G6-Block', 'STSP-0762'),
    ('G6-Block', 'STSP-0763'),
    ('G6-Block', 'STSP-0766'),
    ('G6-Block', 'STSP-0767'),
    ('G6-Block', 'STSP-0768'),
    ('G6-Block', 'STSP-0769'),
    ('G6-Block', 'STSP-0770'),
    ('G6-Block', 'STSP-0771'),
    ('G6-Block', 'STSP-0772'),
    ('G6-Block', 'STSP-0773'),
    ('G6-Block', 'STSP-0774'),
    ('G6-Block', 'STSP-0775'),
    ('G6-Block', 'STSP-0776'),
    ('G6-Block', 'STTS-0295'),
    ('G6-Block', 'STTS-0296'),
    ('G6-Block', 'STTS-0297'),
    ('G6-Block', 'STTS-0299'),
    ('G6-Block', 'STTS-0300'),
    ('G6-Block', 'STTS-0301'),
    ('G6-Block', 'STWB-0137'),
    ('G6-Block', 'STWB-0138'),
    ('G6-Block', 'STWB-0139'),
    ('G6-Block', 'STZK-0220'),
    ('G6-Block', 'STZK-0233'),
    ('G6-Block', 'STZK-L001'),
    ('G6-Block', 'STZK-L002'),
    ('G6-Block', 'STZK-L003'),
    ('G6-Block', 'STCK-0098-170'),
    ('G6-Block', 'STCK-0098-189'),
    ('G6-Block', 'STCK-0098-191'),
    ('G6-Camshaft', 'STAT-0010'),
    ('G6-Camshaft', 'STGR-0118'),
    ('G6-Camshaft', 'STGR-0119'),
    ('G6-Camshaft', 'STGR-0170'),
    ('G6-Camshaft', 'STGR-0173'),
    ('G6-Camshaft', 'STLA-0039'),
    ('G6-Camshaft', 'STLA-0061'),
    ('G6-Camshaft', 'STLP-0013'),
    ('G6-Camshaft', 'STSP-0410'),
    ('G6-Camshaft', 'STSP-0411'),
    ('G6-Camshaft', 'STSP-0519'),
    ('G6-Camshaft', 'STSP-0520'),
    ('G6-Camshaft', 'STSP-0521'),
    ('G6-Camshaft', 'STSP-0522'),
    ('G6-Camshaft', 'STSP-L001'),
    ('G6-Camshaft', 'STTS-0350'),
    ('G6-Camshaft', 'STZY-0415-2'),
    ('G6-Camshaft', 'STZY-0415-3'),
    ('G6-Camshaft', 'STZY-0415-5'),
    ('G6-Camshaft', 'STZY-0415-6'),
    ('G6-Camshaft', 'STZY-0415-7'),
    ('G6-Camshaft', 'STZY-0415-8'),
    ('G6-Crank', 'STAT-0052'),
    ('G6-Crank', 'STAT-0055'),
    ('G6-Crank', 'STCK-0130-1'),
    ('G6-Crank', 'STCK-0130-3'),
    ('G6-Crank', 'STCK-0130-5'),
    ('G6-Crank', 'STGR-0074'),
    ('G6-Crank', 'STIH-0025'),
    ('G6-Crank', 'STLA-0058'),
    ('G6-Crank', 'STLA-0059'),
    ('G6-Crank', 'STLP-0019'),
    ('G6-Crank', 'STSP-0452'),
    ('G6-Crank', 'STSP-0485'),
    ('G6-Crank', 'STSP-0804'),
    ('G6-Crank', 'STSP-0805'),
    ('G6-Crank', 'STSP-0807'),
    ('G6-Crank', 'STSP-0810'),
    ('G6-Crank', 'STSP-0812'),
    ('G6-Crank', 'STTS-0304'),
    ('G6-Crank', 'STTS-0305'),
    ('G6-Crank', 'STZY-0387'),
    ('G6-Crank', 'STZY-0388'),
    ('G6-Crank', 'STZY-0390'),
    ('G6-Crank', 'TGR-051'),
    ('G6-Head', 'STAT-0051'),
    ('G6-Head', 'STAT-L001'),
    ('G6-Head', 'STCK-0126'),
    ('G6-Head', 'STSP-0777'),
    ('G6-Head', 'STSP-0779'),
    ('G6-Head', 'STSP-0780'),
    ('G6-Head', 'STSP-0781'),
    ('G6-Head', 'STSP-0782'),
    ('G6-Head', 'STSP-0783'),
    ('G6-Head', 'STSP-0784'),
    ('G6-Head', 'STSP-0786'),
    ('G6-Head', 'STSP-0787'),
    ('G6-Head', 'STSP-0788'),
    ('G6-Head', 'STSP-0789'),
    ('G6-Head', 'STSP-0790'),
    ('G6-Head', 'STSP-0793'),
    ('G6-Head', 'STSP-0794'),
    ('G6-Head', 'STSP-0795'),
    ('G6-Head', 'STSP-0796'),
    ('G6-Head', 'STTS-0302'),
    ('G6-Head', 'STWB-0142'),
    ('G6-Head', 'STZK-0221'),
    ('G6-Head', 'STZK-0231'),
    ('G6-Head', 'STZK-0232'),
    ('G6-Head', 'TMI-049'),
    ('G6-Head', 'TSP-146'),
    ('G6-Head', 'TSP-147'),
    ('G6-Head', 'TSP-148'),
    ('G6-Head', 'TSP-149'),
    ('G6-Head', 'TSP-195'),
    ('G6-Head', 'TSP-196'),
    ('G6-Head', 'Auto Load'),
    ('G6-Main', 'STCK-0120-1'),
    ('G6-Main', 'STZY-0379'),
    ('G6-Main', 'STZY-0378'),
    ('G6-Main', 'STCK-0118'),
    ('G6-Main', 'STTS-0289'),
    ('G6-Main', 'STAM-0180'),
    ('G6-Main', 'STZY-0374'),
    ('G6-Main', 'STCK-0117'),
    ('G6-Main', 'STZY-0371'),
    ('G6-Main', 'STAM-0168'),
    ('G6-Main', 'STZY-0082'),
    ('G6-Main', 'STAM-0112'),
    ('G6-Main', 'STZY-0375'),
    ('G6-Main', 'STAM-0057'),
    ('G6-Main', 'STCK-0120-2'),
    ('G6-Main', 'STAM-0206'),
    ('G6-Main', 'STTS-0290'),
    ('G6-Main', 'STTS-0337'),
    ('G6-Main', 'STTS-0325'),
    ('G6-Main', 'STZY-0377'),
    ('G6-Main', 'STAM-L005'),
    ('G6-Main', 'STZY-0189'),
    ('G6-Main', 'STMH-011');