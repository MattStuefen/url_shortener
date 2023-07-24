create table url
(
    id serial constraint url_pk primary key,
    short_url text,
    long_url  text,
    created   timestamptz default now()
);

create unique index url_id_uindex on url (id);
create unique index url_short_url_uindex on url (short_url);

INSERT INTO url(short_url, long_url) values('google', 'https://www.google.com') returning id;
INSERT INTO url(short_url, long_url) values('amazon', 'https://www.amazon.com') returning id;
INSERT INTO url(short_url, long_url) values('ebay',   'https://www.ebay.com') returning id;
